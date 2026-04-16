package services

import (
	"civictrack/internal/db"
	"civictrack/internal/models"
)

func CreateIssue(issue models.Issue, email string) (models.Issue, error) {
	query := `
	INSERT INTO public.issues (title, description, status, user_email, priority, category, location)
	VALUES ($1, $2, $3, $4, $5, $6, $7)
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
	).Scan(&issue.ID)

	if err != nil {
		return issue, err
	}

	issue.Status = "pending"
	return issue, nil
}

func GetIssues(email string) ([]models.Issue, error) {
	rows, err := db.DB.Query(`
		SELECT id, title, description, status, COALESCE(priority, ''), COALESCE(category, ''), COALESCE(location, ''), COALESCE(created_at::text, '') 
		FROM public.issues
		WHERE user_email = $1
	`, email)
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
	SET title = $1, description = $2, priority = $3, category = $4, location = $5
	WHERE id = $6
	`

	result, err := db.DB.Exec(query,
		input.Title,
		input.Description,
		input.Priority,
		input.Category,
		input.Location,
		id,
	)

	if err != nil {
		return err
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return err
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
		return err
	}

	return nil
}