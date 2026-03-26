package handlers

import (
	"civictrack/internal/models"
	"civictrack/internal/services"
	"civictrack/internal/db" 
	"github.com/gin-gonic/gin"
)

// Health Check
func HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "API working",
	})
}

// CREATE Issue
func CreateIssue(c *gin.Context) {
	var input models.Issue

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	result, err := services.CreateIssue(input)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to create"})
		return
	}

	c.JSON(201, result)
}

// GET all issues
func GetIssues(c *gin.Context) {
	issues, err := services.GetIssues()
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch"})
		return
	}

	c.JSON(200, issues)
}

// UPDATE issue
func UpdateIssue(c *gin.Context) {
	id := c.Param("id")

	var input models.Issue
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	err := services.UpdateIssue(id, input)
	if err != nil {
		c.JSON(404, gin.H{"error": "Issue not found"})
		return
	}

	c.JSON(200, gin.H{"message": "Issue updated"})
}

// DELETE issue
func DeleteIssue(c *gin.Context) {
	id := c.Param("id")

	err := services.DeleteIssue(id)
	if err != nil {
		c.JSON(404, gin.H{"error": "Issue not found"})
		return
	}

	c.JSON(200, gin.H{"message": "Issue deleted"})
}

func GetIssueByID(c *gin.Context) {
	id := c.Param("id")

	query := "SELECT id, title, description, status, COALESCE(priority, ''), COALESCE(category, ''), COALESCE(location, ''), COALESCE(created_at::text, '') FROM issues WHERE id = $1"

	var issue models.Issue

	err := db.DB.QueryRow(query, id).Scan(
		&issue.ID,
		&issue.Title,
		&issue.Description,
		&issue.Status,
		&issue.Priority,
		&issue.Category,
		&issue.Location,
		&issue.CreatedAt,
	)

	if err != nil {
		c.JSON(404, gin.H{"error": "Issue not found"})
		return
	}

	c.JSON(200, issue)
}