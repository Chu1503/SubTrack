package main

import (
	"fmt"
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// Connect to the database
	database.ConnectToDB()

	// Basic route for testing server status
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World! 👋")
	})

	// User routes
	app.Post("/user", routes.CreateUser)

	// Subscription routes
	app.Post("/sub", routes.CreateSub)
	app.Get("/subs/:user_id", routes.GetSubs)
	app.Post("/subDetails", routes.GetSubDetails)
	app.Patch("/editSubDetails", routes.EditSubDetails)
	app.Post("/deleteSub", routes.DeleteSub)

	// Service routes
	app.Post("/service", routes.CreateService)
	app.Get("/service/:user_id", routes.GetServices)

	// Start the Fiber app
	port := 8080
	fmt.Printf("Server is running on http://localhost:%d\n", port)
	if err := app.Listen(fmt.Sprintf(":%d", port)); err != nil {
		log.Fatalf("Error starting server: %v\n", err)
	}
}
