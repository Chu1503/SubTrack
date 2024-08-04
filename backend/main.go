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

	database.ConnectToDB()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World! 👋")
	})

	//Create user
	app.Post("/user", routes.CreateUser)

	//Create sub
	app.Post("/sub", routes.CreateSub)

	//Get all subs of a user
	app.Get("/sub/:user_id", routes.GetSubs)

	// Start the Fiber app
	port := 8080
	fmt.Printf("Server is running on http://localhost:%d\n", port)
	log.Fatal(app.Listen(fmt.Sprintf(":%d", port)))
}
