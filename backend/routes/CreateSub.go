package routes

import (
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/helpers"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
)

func CreateSub(c *fiber.Ctx) error {
	var sub models.Sub
	//Parse request body into user Struct
	err := c.BodyParser(&sub)
	if err != nil {
		log.Printf("Error parsing JSON: %v\n", err)
		return c.Status(400).JSON("Error parsing JSON")
	}

	//Validate user Struct
	if err := helpers.ValidateSub(sub); err != nil {
		log.Printf("Error validating Sub: %v\n", err)
		return c.Status(400).JSON("Error validating Sub")
	}

	// Check if the user with specified UserID exists
	var user models.User
	if result := database.DB.Where("id = ?", sub.UserID).First(&user); result.Error != nil {
		// User does not exist, return an error
		log.Printf("User with ID %v does not exist\n", sub.UserID)
		return c.Status(400).SendString("User does not exist")
	}

	//Push to database
	result := database.DB.Create(&sub)
	if result.Error != nil {
		log.Printf("Error creating Sub: %v\n", result.Error)
		return c.Status(500).SendString("Error creating Sub")
	}

	//Log and Print successful
	log.Printf("Sub with id %v created\n", sub.ID)
	return c.Status(200).JSON("Sub Created!")
}
