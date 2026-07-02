package main

import (
	"civictrack/internal/db"
	"civictrack/internal/handlers"
	"civictrack/internal/middleware"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
	AllowOrigins: []string{
		"http://localhost:3000",
		"https://civic-track-82wji117t-lochit-vinays-projects.vercel.app",
	},
	AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	ExposeHeaders: []string{"Content-Length"},
	AllowCredentials: true,
	}))

	db.ConnectDB()

	r.GET("/api/health", handlers.HealthCheck)
	r.POST("/signup", handlers.Signup)
	r.POST("/login", handlers.Login)
	r.POST("/auth/google", handlers.GoogleLogin)

	r.GET("/issues", middleware.AuthMiddleware(), handlers.GetIssues)
	r.POST("/issues", middleware.AuthMiddleware(), handlers.CreateIssue)
	r.PUT("/issues/:id", middleware.AuthMiddleware(), handlers.UpdateIssue)
	r.DELETE("/issues/:id", middleware.AuthMiddleware(), handlers.DeleteIssue)
	r.GET("/issues/:id", middleware.AuthMiddleware(), handlers.GetIssueByID)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}