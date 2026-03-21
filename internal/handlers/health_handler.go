package handlers

import "github.com/gin-gonic/gin"

// HealthCheck(This handles the API health status)
func HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "API working",
	})
}
