package database

import (
	"log"
	"os"
	"subscription-manager-backend/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DB_STRING")
	if dsn == "" {
		log.Fatal("DB_STRING environment variable not set")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	log.Println("Connecting to DB...")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connection established!")

	if os.Getenv("SHOULD_MIGRATE") == "TRUE" {
		log.Println("Running DB Migrations...")

		err = db.AutoMigrate(&models.User{}, &models.Sub{})

		if err != nil {
			log.Fatalf("Error running migrations: %v", err)
		}

		log.Println("DB Migrations completed!")
	}

	DB = db
}
