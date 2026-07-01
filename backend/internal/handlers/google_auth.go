package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/api/idtoken"
)

var jwtSecret = []byte("secret")

type GoogleLoginRequest struct {
	Token string `json:"token"`
}

func GoogleLogin(c *gin.Context) {
	var req GoogleLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	payload, err := idtoken.Validate(c, req.Token, "")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Google token"})
		return
	}

	email := payload.Claims["email"].(string)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"role":  "citizen",
		"state": "",
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})

	jwtToken, _ := token.SignedString(jwtSecret)

	c.JSON(http.StatusOK, gin.H{
		"token": jwtToken,
	})
}