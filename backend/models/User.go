package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type User struct {
	ID string `gorm:"primaryKey;type:varchar(50);not null" json:"id" valid:"required~Custom ID is required"`
	gorm.Model
	Email  string         `gorm:"type:varchar(100);unique;not null" json:"email" valid:"required~Email is required,email~Invalid email"`
	Custom datatypes.JSON `json:"body"`
}
