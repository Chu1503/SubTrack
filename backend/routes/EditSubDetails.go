package routes

import (
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func EditSubDetails(c *fiber.Ctx) error {
	var sub models.Sub

	// Parse request body into Sub Struct
	if err := c.BodyParser(&sub); err != nil {
		log.Printf("Error parsing JSON: %v\n", err)
		return c.Status(400).JSON("Error parsing JSON")
	}

	// Validate the subscription ID
	if sub.ID == uuid.Nil {
		return c.Status(400).JSON("Subscription ID is required")
	}

	// Update the subscription in the database
	if result := database.DB.Model(&models.Sub{}).Where("id = ?", sub.ID).Updates(&sub); result.Error != nil {
		log.Printf("Error updating subscription: %v\n", result.Error)
		return c.Status(500).JSON("Error updating subscription")
	}

	return c.Status(200).JSON("Sub details updated successfully")
}
