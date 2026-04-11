package main

import (
	"civictrack/internal/db"
	"civictrack/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	db.ConnectDB()

	r.GET("/api/health", handlers.HealthCheck)
	r.POST("/signup", handlers.Signup)
	r.POST("/login", handlers.Login)

	r.GET("/issues", handlers.GetIssues)
r.POST("/issues", handlers.CreateIssue)
r.PUT("/issues/:id", handlers.UpdateIssue)
r.DELETE("/issues/:id", handlers.DeleteIssue)
r.GET("/issues/:id", handlers.GetIssueByID)
	r.Run(":8080")
}
