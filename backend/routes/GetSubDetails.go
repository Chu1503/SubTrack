package routes

import (
	"log"
	"strconv"
	"subscription-manager-backend/database"
	"subscription-manager-backend/helpers"
	"subscription-manager-backend/models"

	"github.com/gofiber/fiber/v2"
)

func GetSubDetails(c *fiber.Ctx) error {
	// Define a struct to parse the request body
	type Request struct {
		UserID string `json:"user_id" valid:"required~User ID is required"`
		SubID  string `json:"sub_id" valid:"required~SubID field is required"`
	}

	var req Request

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
	if result := database.DB.Where("id = ?", req.UserID).First(&user); result.Error != nil {
		log.Printf("User with ID %s not found: %v\n", req.UserID, result.Error)
		return c.Status(404).JSON("User not found")
	}

	// Convert SubID to integer
	var sub models.Sub
	sub_id, err := strconv.Atoi(req.SubID)
	if err != nil {
		log.Printf("Error converting SubID to integer: %v\n", err)
		return c.Status(400).JSON("Error validating request data")
	}

	// Check if the sub exists for the user
	if result := database.DB.Where("id = ? AND user_id = ?", sub_id, req.UserID).First(&sub); result.Error != nil {
		log.Printf("Sub with ID %v not found: %v\n", sub_id, result.Error)
		return c.Status(404).JSON("Sub not found")
	}

	// Return the sub details
	// Log request data for debugging
	log.Printf("Parsed request data - UserID: %s, SubID: %s\n", req.UserID, req.SubID)
	return c.JSON(sub)
}
