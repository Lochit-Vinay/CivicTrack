package main  
import "github.com/gin-gonic/gin"  
func main() { 
	r := gin.Default()  
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "CivicTrack API running 🚀",
		})
	})
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "running backend",
		})
	})
	r.GET("/login", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"credentials": "username and password",
		})
	})
	r.Run(":8080")
}