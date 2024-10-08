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
	userID := c.Params("user_id")

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
		case subs[i].Frequency == "semi-annually":
			endDate = subs[i].StartDate.AddDate(0, 6, 0) // Adds six months
		case strings.HasPrefix(subs[i].Frequency, "custom:"):
			durationStr := strings.TrimPrefix(subs[i].Frequency, "custom:")
			unit := durationStr[len(durationStr)-1:]
			amount, err := strconv.Atoi(durationStr[:len(durationStr)-1])
			if err != nil {
				return c.Status(400).SendString("Invalid custom duration format")
			}
			switch unit {
			case "d":
				endDate = subs[i].StartDate.AddDate(0, 0, amount) // Adds custom days
			case "m":
				endDate = subs[i].StartDate.AddDate(0, amount, 0) // Adds custom months
			case "y":
				endDate = subs[i].StartDate.AddDate(amount, 0, 0) // Adds custom years
			default:
				return c.Status(400).SendString("Invalid custom duration unit")
			}
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
