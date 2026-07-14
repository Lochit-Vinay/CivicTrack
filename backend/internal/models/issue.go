package models

type Issue struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Priority    string `json:"priority"`
	Category    string `json:"category"`
	Location    string `json:"location"`
	State       string `json:"state"`
	CreatedAt   string `json:"created_at"`
	Image       string `json:"image"`
}
