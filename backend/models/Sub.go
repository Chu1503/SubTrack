package models

import (
	"time"

	"gorm.io/gorm"
)

type Sub struct {
	gorm.Model
	UserID      uint      `gorm:"foreignKey:UserID;references:ID" json:"user_id"`
	Name        string    `json:"name"`
	Price       float64   `json:"price"`       // Price of the subscription
	StartDate   time.Time `json:"start_date"`  // Start date of the subscription
	Status      string    `json:"status"`      // Status of the subscription (e.g., active, expired)
	Description string    `json:"description"` // Optional notes or description about the subscription
	Frequency   string    `json:"frequency"`   // Frequency of renewal (e.g., monthly, annually, custom:7d)
}
