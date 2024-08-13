package routes

import (
	"fmt"
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/helpers"
	"subscription-manager-backend/models"

	expo "github.com/oliveroneill/exponent-server-sdk-golang/sdk"
)

func SendNotif() {
	// Call CheckExpiry to get the list of notifications
	notifications, err := helpers.CheckExpiry()
	if err != nil {
		log.Printf("error getting notifications: %v", err)
		return
	}

	// Create a new Expo SDK client
	client := expo.NewPushClient(nil)

	// Iterate over notifications and send push notifications
	for _, notification := range notifications {
		pushToken, err := expo.NewExponentPushToken(notification.ExpoToken)
		if err != nil {
			log.Printf("invalid expo token for user %s: %v", notification.UserID, err)
			continue
		}

		// Check if the sub exists for the user
		var sub models.Sub
		if result := database.DB.Where("id = ? AND user_id = ?", notification.SubID, notification.UserID).First(&sub); result.Error != nil {
			log.Printf("Sub with ID %v not found: %v\n", notification.SubID, result.Error)
		}

		log.Printf("Sending notification for user %s", notification.UserID)

		// Publish message
		response, err := client.Publish(
			&expo.PushMessage{
				To:       []expo.ExponentPushToken{pushToken},
				Body:     fmt.Sprintf("Your subscription of %s is about to expire on %s.", sub.Name, notification.ExpiryDate.Format("Jan 2, 2006")),
				Sound:    "default",
				Title:    "SubTrack: Reminder",
				Priority: expo.DefaultPriority,
			},
		)

		// Check for errors
		if err != nil {
			log.Printf("error sending notification for user %s: %v", notification.UserID, err)
			continue
		}

		// Validate response
		if response.ValidateResponse() != nil {
			log.Printf("notification for user %s failed", notification.UserID)
		}
	}
}
