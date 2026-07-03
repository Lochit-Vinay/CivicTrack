package handlers

import (
	"civictrack/internal/db"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("secret")

// SIGNUP
func Signup(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Role     string `json:"role"`
		State    string `json:"state"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	if input.Role == "" {
		input.Role = "citizen"
	}

	if input.Role == "authority" {
		emailLower := strings.ToLower(input.Email)
		if !strings.HasSuffix(emailLower, "_auth@civictrack.com") {
			c.JSON(400, gin.H{"error": "Invalid authority email format. Must be state_auth@civictrack.com"})
			return
		}
		stateName := strings.TrimSuffix(emailLower, "_auth@civictrack.com")
		if stateName == "" {
			c.JSON(400, gin.H{"error": "Invalid authority email format"})
			return
		}
		expectedPassword := stateName + "@123"
		if input.Password != expectedPassword {
			c.JSON(400, gin.H{"error": "Invalid authority password format. Must be statename@123"})
			return
		}
		input.State = stateName
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 14)

	query := `INSERT INTO users (email, password, role, state) VALUES ($1, $2, $3, $4)`
	_, err := db.DB.Exec(query, input.Email, string(hashedPassword), input.Role, input.State)

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
		Role     string
		State    string
	}

	query := `SELECT id, email, password, role, state FROM users WHERE email=$1`
	err := db.DB.QueryRow(query, input.Email).Scan(&user.ID, &user.Email, &user.Password, &user.Role, &user.State)

	if err != nil {
		emailLower := strings.ToLower(input.Email)
		if strings.HasSuffix(emailLower, "_auth@civictrack.com") {
			stateName := strings.TrimSuffix(emailLower, "_auth@civictrack.com")
			expectedPassword := stateName + "@123"
			if stateName != "" && (input.Password == expectedPassword || input.Password == "state@123") {
				hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
				
				assignedRole := "authority"
				if stateName == "admin" {
					assignedRole = "admin"
				}

				insertQuery := `INSERT INTO users (email, password, role, state) VALUES ($1, $2, $3, $4) RETURNING id`
				err = db.DB.QueryRow(insertQuery, input.Email, string(hashedPassword), assignedRole, stateName).Scan(&user.ID)
				if err == nil {
					user.Email = input.Email
					user.Password = string(hashedPassword)
					user.Role = assignedRole
					user.State = stateName
				} else {
					c.JSON(500, gin.H{"error": "Failed to create authority user on-the-fly"})
					return
				}
			} else {
				c.JSON(401, gin.H{"error": "Invalid authority credentials"})
				return
			}
		} else {
			c.JSON(401, gin.H{"error": "Invalid credentials"})
			return
		}
	}

	// If the user role is authority, validate the email and password formats
	if user.Role == "authority" {
		emailLower := strings.ToLower(input.Email)
		if !strings.HasSuffix(emailLower, "_auth@civictrack.com") {
			c.JSON(401, gin.H{"error": "Invalid authority email format. Must be state_auth@civictrack.com"})
			return
		}
		stateName := strings.TrimSuffix(emailLower, "_auth@civictrack.com")
		if stateName == "" {
			c.JSON(401, gin.H{"error": "Invalid authority email format"})
			return
		}
		expectedPassword := stateName + "@123"
		if input.Password != expectedPassword && input.Password != "state@123" {
			c.JSON(401, gin.H{"error": "Invalid authority password format. Must be statename@123 or state@123"})
			return
		}
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid credentials"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"role":    user.Role,
		"state":   user.State,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, _ := token.SignedString(jwtKey)

	c.JSON(200, gin.H{"token": tokenString})
}