package handlers

import (
	"civictrack/internal/models"

	"github.com/gin-gonic/gin"
	"civictrack/internal/db"  
)

func HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "API working",
	})
}

func CreateIssue(c *gin.Context) {
	var input models.Issue

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	query := `INSERT INTO issues (title, description, status) 
	          VALUES ($1, $2, $3) RETURNING id`

	err := db.DB.QueryRow(query,
		input.Title,
		input.Description,
		"pending",
	).Scan(&input.ID)

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to insert"})
		return
	}

	input.Status = "pending"

	c.JSON(201, input)
}

func GetIssues(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, title, description, status FROM issues")
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch"})
		return
	}
	defer rows.Close()

	var issues []models.Issue

	for rows.Next() {
		var issue models.Issue
		err := rows.Scan(&issue.ID, &issue.Title, &issue.Description, &issue.Status)
		if err != nil {
			continue
		}
		issues = append(issues, issue)
	}

	c.JSON(200, issues)
}

func UpdateIssue(c *gin.Context) {
	id := c.Param("id")

	var input models.Issue

	// Read JSON input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	query := `
	UPDATE issues
	SET title = $1, description = $2
	WHERE id = $3
	`

	result, err := db.DB.Exec(query,
		input.Title,
		input.Description,
		id,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to update"})
		return
	}

	rowsAffected, _ := result.RowsAffected()

	if rowsAffected == 0 {
		c.JSON(404, gin.H{"error": "Issue not found"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Issue updated",
	})
}


func DeleteIssue(c *gin.Context) {
	id := c.Param("id")

	query := "DELETE FROM issues WHERE id = $1"

	result, err := db.DB.Exec(query, id)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete"})
		return
	}

	rowsAffected, _ := result.RowsAffected()

	if rowsAffected == 0 {
		c.JSON(404, gin.H{"error": "Issue not found"})
		return
	}

	c.JSON(200, gin.H{"message": "Issue deleted"})
}
