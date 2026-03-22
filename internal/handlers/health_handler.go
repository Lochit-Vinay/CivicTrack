package handlers

import (
	"civictrack/internal/models"
	"github.com/gin-gonic/gin"
	
)
import (
	"fmt"
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

func UpdateIssue(c *gin.Context) {
	idParam := c.Param("id")

	var updatedIssue models.Issue

	if err := c.ShouldBindJSON(&updatedIssue); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	for i, issue := range issues {
		if fmt.Sprintf("%d", issue.ID) == idParam {
			issues[i].Title = updatedIssue.Title
			issues[i].Description = updatedIssue.Description

			c.JSON(200, issues[i])
			return
		}
	}

	c.JSON(404, gin.H{"error": "Issue not found"})
}

func DeleteIssue(c *gin.Context) {
	idParam := c.Param("id")

	for i, issue := range issues {
		if fmt.Sprintf("%d", issue.ID) == idParam {
			issues = append(issues[:i], issues[i+1:]...)
			c.JSON(200, gin.H{"message": "Issue deleted"})
			return
		}
	}

	c.JSON(404, gin.H{"error": "Issue not found"})
}