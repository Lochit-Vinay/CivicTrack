package main

import (
	"civictrack/internal/db"
	"civictrack/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	db.ConnectDB()

	r.GET("/", handlers.HealthCheck)
	r.POST("/issues", handlers.CreateIssue)
	r.GET("/issues", handlers.GetIssues)
	r.PUT("/issues/:id", handlers.UpdateIssue)
	r.DELETE("/issues/:id", handlers.DeleteIssue)
	r.Run(":8080")
}
