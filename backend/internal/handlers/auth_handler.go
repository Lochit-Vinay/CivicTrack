package handlers

import (
	"civictrack/internal/db"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

var jwtKey = []byte("secret_key")

// SIGNUP
func Signup(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 14)

	query := `INSERT INTO users (email, password) VALUES ($1, $2)`
	_, err := db.DB.Exec(query, input.Email, string(hashedPassword))

	if err != nil {
		c.JSON(500, gin.H{"error": "User already exists"})
		return
	}

	c.JSON(201, gin.H{"message": "User created"})
}

// LOGIN
func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	var user struct {
		ID       int
		Email    string
		Password string
	}

	query := `SELECT id, email, password FROM users WHERE email=$1`
	err := db.DB.QueryRow(query, input.Email).Scan(&user.ID, &user.Email, &user.Password)

	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid credentials"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid credentials"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, _ := token.SignedString(jwtKey)

	c.JSON(200, gin.H{"token": tokenString})
}