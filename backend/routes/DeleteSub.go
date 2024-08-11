package routes

import (
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func DeleteSub(c *fiber.Ctx) error {
	// Define a struct to parse the request body
	type Request struct {
		UserID string    `json:"user_id" valid:"required~User ID is required"`
		ID     uuid.UUID `json:"sub_id" valid:"required~SubID field is required"`
	}

	var req Request

	// Parse request body into Sub Struct
	if err := c.BodyParser(&req); err != nil {
		log.Printf("Error parsing JSON: %v\n", err)
		return c.Status(400).JSON("Error parsing JSON")
	}

	// Check if the user exists
	var user models.User
	if result := database.DB.Where("id = ?", req.UserID).First(&user); result.Error != nil {
		log.Printf("User with ID %s not found: %v\n", req.UserID, result.Error)
		return c.Status(404).JSON("User not found")
	}

	// Validate the subscription ID
	if req.ID == uuid.Nil {
		return c.Status(400).JSON("Subscription ID is required")
	}

	// Delete the subscription from the database
	var sub models.Sub
	if result := database.DB.Delete(&sub, "id = ?", req.ID); result.Error != nil {
		log.Printf("Error deleting subscription: %v\n", result.Error)
		return c.Status(500).JSON("Error deleting subscription")
	}
	// Return success response
	return c.Status(200).JSON("Subscription deleted successfully")

}
