package main

import (
	"fmt"
	"log"
	"subscription-manager-backend/database"
	"subscription-manager-backend/routes"
	"time"

	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New()

	// Connect to the database
	database.ConnectToDB()

	// Start periodic notifications in a goroutine with a customizable interval
	go startNotificationTicker(1440 * time.Minute) // Customize the interval here

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
	app.Post("/service", routes.CreateCustom)
	app.Get("/service/:user_id", routes.GetCustom)

	// Route to manually trigger notifications
	app.Get("/send-notifications/:key", routes.ForceSendNotif)

	// Start the Fiber app
	port := 8080
	fmt.Printf("Server is running on http://localhost:%d\n", port)
	if err := app.Listen(fmt.Sprintf(":%d", port)); err != nil {
		log.Fatalf("Error starting server: %v\n", err)
	}
}

// Function to start a ticker that calls SendNotif with a customizable interval
func startNotificationTicker(interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for tick := range ticker.C {
		err := routes.SendNotif()
		if err != nil {
			log.Printf("Error sending notifications: %v", err)
		} else {
			log.Printf("Notifications sent successfully at %v", tick)
		}
	}
}
