package routes

import (
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/helpers"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/datatypes"
)

func CreateCustom(c *fiber.Ctx) error {
	// Define a struct to parse the request body
	type UpdateRequest struct {
		UserID string         `json:"user_id" valid:"required~User ID is required"`
		Custom datatypes.JSON `json:"custom" valid:"required~Custom field is required"`
	}

	var req UpdateRequest

	// Parse request body into UpdateRequest Struct
	err := c.BodyParser(&req)
	if err != nil {
		log.Printf("Error parsing JSON: %v\n", err)
		return c.Status(400).JSON("Error parsing JSON")
	}

	// Validate request data
	if err := helpers.ValidateStruct(req); err != nil {
		log.Printf("Error validating request data: %v\n", err)
		return c.Status(400).JSON("Error validating request data")
	}

	// Check if the user exists
	var user models.User
	if result := database.DB.First(&user, "id = ?", req.UserID); result.Error != nil {
		log.Printf("User with ID %s not found\n", req.UserID)
		return c.Status(404).JSON("User not found")
	}

	// Update the custom field
	user.Custom = req.Custom
	if result := database.DB.Model(&user).Update("custom", user.Custom); result.Error != nil {
		log.Printf("Error updating user: %v\n", result.Error)
		return c.Status(500).SendString("Error updating user")
	}

	// Log and Print successful
	log.Printf("Custom field updated for user with ID %s\n", req.UserID)
	return c.Status(200).JSON("Custom field updated successfully")
}
