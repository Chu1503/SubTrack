package helpers

import (
	"subscription-manager-backend/models"

	"github.com/asaskevich/govalidator"
)

func ValidateUser(user models.User) error {
	_, err := govalidator.ValidateStruct(user)
	return err
}

func ValidateSub(sub models.Sub) error {
	_, err := govalidator.ValidateStruct(sub)
	return err
}
