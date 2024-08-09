package models

import (
	"time"

	"gorm.io/gorm"
)

type Sub struct {
	gorm.Model
	UserID    string    `gorm:"foreignKey:UserID;references:ID" json:"user_id"`
	Name      string    `json:"name"`
	Price     float64   `json:"price"`      // Price of the subscription
	StartDate time.Time `json:"start_date"` // Start date of the subscription
	Status    string    `json:"status"`     // Status of the subscription (e.g., active, expired)
	Frequency string    `json:"frequency"`  // Frequency of renewal (e.g., monthly, semi-annually, annually, custom:7d)
}
