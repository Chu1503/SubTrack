package routes

import (
	"fmt"
	"log"
	"os"
	"subscription-manager-backend/database"
	"subscription-manager-backend/helpers"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
	expo "github.com/oliveroneill/exponent-server-sdk-golang/sdk"
)

func SendNotif() error {
	// Call CheckExpiry to get the list of notifications
	notifications, err := helpers.CheckExpiry()
	if err != nil {
		log.Printf("Error getting notifications: %v", err)
		return err
	}

	// Create a new Expo SDK client
	client := expo.NewPushClient(nil)

	// Iterate over notifications and send push notifications
	for _, notification := range notifications {
		pushToken, err := expo.NewExponentPushToken(notification.ExpoToken)
		if err != nil {
			log.Printf("Invalid expo token for user %s: %v", notification.UserID, err)
			continue
		}

		// Check if the subscription exists for the user
		var sub models.Sub
		if result := database.DB.Where("id = ? AND user_id = ?", notification.SubID, notification.UserID).First(&sub); result.Error != nil {
			log.Printf("Subscription with ID %v not found: %v\n", notification.SubID, result.Error)
			continue
		}

		// Log the attempt to send a notification
		log.Printf("Sending notification for user %s", notification.UserID)

		// Publish message
		response, err := client.Publish(
			&expo.PushMessage{
				To:       []expo.ExponentPushToken{pushToken},
				Body:     fmt.Sprintf("Your subscription '%s' is expiring on %s.", sub.Name, notification.ExpiryDate.Format("Jan 2, 2006")),
				Sound:    "default",
				Title:    "SubTrack: Reminder",
				Priority: expo.DefaultPriority,
			},
		)

		// Check for errors
		if err != nil {
			log.Printf("Error sending notification for user %s: %v", notification.UserID, err)
			continue
		}

		// Validate response
		if response.ValidateResponse() != nil {
			log.Printf("Notification for user %s failed", notification.UserID)
		}
	}

	return nil
}

func ForceSendNotif(c *fiber.Ctx) error {
	key := c.Params("key")
	admin_key := os.Getenv("ADMIN_KEY")
	if key != admin_key || key == "" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": "Unauthorized Admin",
		})
	}
	err := SendNotif()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to send notifications",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Notifications sent successfully",
	})
}
