package routes

import (
	"subscription-manager-backend/database"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
)

func GetServices(c *fiber.Ctx) error {
	userID := c.Params("user_id")

	// Query the database for the user
	var user models.User
	result := database.DB.Where("id = ?", userID).First(&user)
	if result.Error != nil {
		return c.Status(500).SendString(result.Error.Error())
	}

	// Return the Custom field as JSON
	return c.JSON(user.Custom)
}
