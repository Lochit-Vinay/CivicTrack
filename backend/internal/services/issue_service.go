package services

import (
	"database/sql"
	"civictrack/internal/db"
	"civictrack/internal/models"
)

func CreateIssue(issue models.Issue, email string) (models.Issue, error) {
	query := `
	INSERT INTO public.issues (title, description, status, user_email, priority, category, location, state, image)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	RETURNING id
	`

	err := db.DB.QueryRow(
		query,
		issue.Title,
		issue.Description,
		"pending",
		email,
		issue.Priority,
		issue.Category,
		issue.Location,
		issue.State,
		issue.Image,
	).Scan(&issue.ID)

	if err != nil {
		return issue, err
	}

	issue.Status = "pending"
	return issue, nil
}

func GetIssues(email string, role string, state string) ([]models.Issue, error) {
	var rows *sql.Rows
	var err error

	if role == "admin" {
		rows, err = db.DB.Query(`
			SELECT id, title, description, status, COALESCE(priority, ''), COALESCE(category, ''), COALESCE(location, ''), COALESCE(state, ''), COALESCE(image, ''), COALESCE(created_at::text, '') 
			FROM public.issues
		`)
	} else if role == "authority" {
		rows, err = db.DB.Query(`
			SELECT id, title, description, status, COALESCE(priority, ''), COALESCE(category, ''), COALESCE(location, ''), COALESCE(state, ''), COALESCE(image, ''), COALESCE(created_at::text, '') 
			FROM public.issues
			WHERE LOWER(state) = LOWER($1)
		`, state)
	} else {
		rows, err = db.DB.Query(`
			SELECT id, title, description, status, COALESCE(priority, ''), COALESCE(category, ''), COALESCE(location, ''), COALESCE(state, ''), COALESCE(image, ''), COALESCE(created_at::text, '') 
			FROM public.issues
			WHERE user_email = $1
		`, email)
	}

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	issues := []models.Issue{}

	for rows.Next() {
		var issue models.Issue
		err := rows.Scan(
			&issue.ID,
			&issue.Title,
			&issue.Description,
			&issue.Status,
			&issue.Priority,
			&issue.Category,
			&issue.Location,
			&issue.State,
			&issue.Image,
			&issue.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		issues = append(issues, issue)
	}

	return issues, nil
}

func UpdateIssue(id string, input models.Issue) error {
	query := `
	UPDATE public.issues
	SET title = $1, description = $2, priority = $3, category = $4, location = $5, state = $6, status = $7, image = $8
	WHERE id = $9
	`

	result, err := db.DB.Exec(query,
		input.Title,
		input.Description,
		input.Priority,
		input.Category,
		input.Location,
		input.State,
		input.Status,
		input.Image,
		id,
	)

	if err != nil {
		return err
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func DeleteIssue(id string) error {
	query := "DELETE FROM public.issues WHERE id = $1"

	result, err := db.DB.Exec(query, id)
	if err != nil {
		return err
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return sql.ErrNoRows
	}

	return nil
}