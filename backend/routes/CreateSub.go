package routes

import (
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/helpers"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func CreateSub(c *fiber.Ctx) error {
	var sub models.Sub

	newUUID := uuid.New()
	sub.ID = newUUID

	// Parse request body into subscription Struct
	err := c.BodyParser(&sub)
	if err != nil {
		log.Printf("Error parsing JSON: %v\n", err)
		return c.Status(400).JSON(fiber.Map{"error": "Error parsing JSON"})
	}

	// Validate subscription Struct
	if err := helpers.ValidateSub(sub); err != nil {
		log.Printf("Error validating Sub: %v\n", err)
		return c.Status(400).JSON(fiber.Map{"error": "Error validating Sub"})
	}

	// Check if the user with specified UserID exists
	var user models.User
	if result := database.DB.Where("id = ?", sub.UserID).First(&user); result.Error != nil {
		// User does not exist, return an error
		log.Printf("User with ID %v does not exist\n", sub.UserID)
		return c.Status(400).JSON(fiber.Map{"error": "User does not exist"})
	}

	// Push to database
	result := database.DB.Create(&sub)
	if result.Error != nil {
		log.Printf("Error creating Sub: %v\n", result.Error)
		return c.Status(500).JSON(fiber.Map{"error": "Error creating Sub"})
	}

	// Log and Print successful
	log.Printf("Sub with id %v created\n", sub.ID)
	return c.Status(200).JSON(fiber.Map{"message": "Sub Created!", "id": sub.ID})
}
