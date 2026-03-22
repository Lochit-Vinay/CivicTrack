package handlers

import (
	"civictrack/internal/models"
	"github.com/gin-gonic/gin"
)

var issues []models.Issue
var idCounter = 1

func HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "API working",
	})
}

func CreateIssue(c *gin.Context) {
	var input models.Issue

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid input",
		})
		return
	}

	input.ID = idCounter
	input.Status = "pending"
	idCounter++

	issues = append(issues, input)

	c.JSON(201, input)
}

// ✅ OUTSIDE (separate function)
func GetIssues(c *gin.Context) {
	c.JSON(200, issues)
}