package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	MobileNo string `gorm:"type:varchar(20);not null" json:"mobile_no" valid:"required~Contact number is required"`
}
