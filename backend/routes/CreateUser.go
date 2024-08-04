package routes

import (
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/helpers"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
)

func CreateUser(c *fiber.Ctx) error {
	var user models.User

	//Parse request body into user Struct
	err := c.BodyParser(&user)
	if err != nil {
		log.Printf("Error parsing JSON: %v\n", err)
		return c.Status(400).JSON("Error parsing JSON")
	}

	//Validate user Struct
	if err := helpers.ValidateUser(user); err != nil {
		log.Printf("Error validating user: %v\n", err)
		return c.Status(400).JSON("Error validating user")
	}

	// Check if the user already exists
	var existingUser models.User
	if result := database.DB.Where("mobile_no = ?", user.MobileNo).First(&existingUser); result.Error == nil {
		// User already exists
		log.Printf("User with MobileNo %s already exists\n", user.MobileNo)
		return c.Status(400).JSON("User already exists")
	}

	//Push to database
	result := database.DB.Create(&user)
	if result.Error != nil {
		log.Printf("Error creating user: %v\n", result.Error)
		return c.Status(500).SendString("Error creating user")
	}

	//Log and Print successful
	log.Printf("user with id %v created\n", user.ID)
	return c.Status(200).JSON("User Created!")
}
