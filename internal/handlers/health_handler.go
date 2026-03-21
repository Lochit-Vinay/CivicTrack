package handlers

import (
	"civictrack/internal/models"
	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	issue := models.Issue{
		ID:          1,
		Title:       "Pothole",
		Description: "Big pothole on road",
		Status:      "pending",
	}

	c.JSON(200, issue)
}