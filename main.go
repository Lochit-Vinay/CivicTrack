package main

import (
	"civictrack/internal/handlers"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", handlers.HealthCheck)
    r.POST("/issues", handlers.CreateIssue)
	r.GET("/issues", handlers.GetIssues)
	r.Run(":8080")	
}
