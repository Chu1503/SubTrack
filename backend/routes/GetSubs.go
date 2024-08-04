package routes

import (
	"strconv"
	"strings"
	"subscription-manager-backend/database"
	"subscription-manager-backend/models"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetSubs(c *fiber.Ctx) error {
	userIDParam := c.Params("user_id")
	userID, err := strconv.Atoi(userIDParam)
	if err != nil {
		return c.Status(400).SendString("Invalid user ID")
	}

	// Query the database for subscriptions belonging to the user
	var subs []models.Sub
	result := database.DB.Where("user_id = ?", userID).Find(&subs)
	if result.Error != nil {
		return c.Status(500).SendString(result.Error.Error())
	}

	// Get the current time
	now := time.Now()

	// Update subscriptions with expired status
	for i := range subs {
		// Calculate the end date based on frequency
		var endDate time.Time
		switch {
		case subs[i].Frequency == "monthly":
			endDate = subs[i].StartDate.AddDate(0, 1, 0) // Adds one month
		case subs[i].Frequency == "annually":
			endDate = subs[i].StartDate.AddDate(1, 0, 0) // Adds one year
		case strings.HasPrefix(subs[i].Frequency, "custom:"):
			durationStr := strings.TrimPrefix(subs[i].Frequency, "custom:")
			duration, err := time.ParseDuration(durationStr)
			if err != nil {
				return c.Status(400).SendString("Invalid custom duration format")
			}
			endDate = subs[i].StartDate.Add(duration)
		default:
			return c.Status(400).SendString("Unknown frequency type")
		}

		if endDate.Before(now) && subs[i].Status != "expired" {
			subs[i].Status = "expired"
			if err := database.DB.Save(&subs[i]).Error; err != nil {
				return c.Status(500).SendString("Failed to update subscription status")
			}
		}
	}

	// Return the subscriptions as JSON
	return c.JSON(subs)
}
