package helpers

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"strings"
	"subscription-manager-backend/database"
	"subscription-manager-backend/models"
	"time"

	"github.com/google/uuid"
)

// Duration mapping for frequencies
var frequencyToDuration = map[string]time.Duration{
	"annually":      365 * 24 * time.Hour,
	"semi-annually": 183 * 24 * time.Hour, // Approximate 6 months
	"monthly":       30 * 24 * time.Hour,
}

// Parse custom duration strings like "custom:7d", "custom:8m", "custom:2y"
func parseCustomDuration(customDuration string) (time.Duration, error) {
	if !strings.HasPrefix(customDuration, "custom:") {
		return 0, fmt.Errorf("invalid custom duration format")
	}

	parts := strings.TrimPrefix(customDuration, "custom:")
	if len(parts) < 2 {
		return 0, fmt.Errorf("invalid custom duration format")
	}

	unit := parts[len(parts)-1]
	value, err := strconv.Atoi(parts[:len(parts)-1])
	if err != nil {
		return 0, fmt.Errorf("error parsing duration value: %w", err)
	}

	switch unit {
	case 'd':
		return time.Duration(value) * 24 * time.Hour, nil
	case 'm':
		return time.Duration(value) * 30 * 24 * time.Hour, nil // Approximate month
	case 'y':
		return time.Duration(value) * 365 * 24 * time.Hour, nil // Approximate year
	default:
		return 0, fmt.Errorf("unknown custom duration unit: %c", unit)
	}
}

// Notification struct for holding notification data
type Notification struct {
	SubID      uuid.UUID
	UserID     string
	ExpiryDate time.Time
	ExpoToken  string
}

// SendNotif returns a slice of notifications to be sent
func CheckExpiry() ([]Notification, error) {
	var subs []models.Sub
	var users []models.User

	// Define the number of days within which to check for expiration
	daysBeforeExpiration := 7 // Example: Notify if the subscription is about to expire within 7 days

	// Get the current time
	now := time.Now()

	// Retrieve all subscriptions from the database
	if result := database.DB.Find(&subs); result.Error != nil {
		log.Printf("Error retrieving subscriptions: %v\n", result.Error)
		return nil, result.Error
	}

	// Retrieve all users from the database
	if result := database.DB.Find(&users); result.Error != nil {
		log.Printf("Error retrieving users: %v\n", result.Error)
		return nil, result.Error
	}

	// Create a map to quickly access expoTokens by userID
	userExpoTokens := make(map[string]string)
	for _, user := range users {
		var userData map[string]interface{}
		if err := json.Unmarshal(user.Custom, &userData); err != nil {
			log.Printf("Error unmarshalling custom data for user ID %s: %v\n", user.ID, err)
			continue
		}

		// Navigate to the correct field in the structure
		if token, ok := userData["expoToken"].(string); ok {
			userExpoTokens[user.ID] = token
		}
	}

	// Slice to hold notifications
	var notifications []Notification

	for _, sub := range subs {
		// Use StartDate directly since it's already a time.Time object
		startDate := sub.StartDate

		// Convert frequency to duration
		var duration time.Duration
		if frequency, ok := frequencyToDuration[sub.Frequency]; ok {
			duration = frequency
		} else if strings.HasPrefix(sub.Frequency, "custom:") {
			customDuration, err := parseCustomDuration(sub.Frequency)
			if err != nil {
				log.Printf("Error parsing custom duration %s for subscription ID %s: %v\n", sub.Frequency, sub.ID, err)
				continue
			}
			duration = customDuration
		} else {
			log.Printf("Unknown frequency %s for subscription ID %s\n", sub.Frequency, sub.ID)
			continue
		}

		// Calculate the next expiration date
		nextExpirationDate := startDate.Add(duration)

		// Check if the next expiration date is within the threshold
		if nextExpirationDate.Sub(now).Hours() < float64(daysBeforeExpiration*24) {
			// Get the expoToken for the user
			expoToken, userFound := userExpoTokens[sub.UserID]
			if userFound {
				// Add to notifications list
				notifications = append(notifications, Notification{
					SubID:      sub.ID,
					UserID:     sub.UserID,
					ExpiryDate: nextExpirationDate,
					ExpoToken:  expoToken,
				})
			} else {
				// Log for debug purposes
				log.Printf("Subscription ID %s for User ID %s is about to expire on %s. User has no expoToken.",
					sub.ID, sub.UserID, nextExpirationDate.Format("2006-01-02"))
			}
		}
	}

	return notifications, nil
}
