package services

import (
	"civictrack/internal/db"
	"civictrack/internal/models"
)

func CreateIssue(input models.Issue) (models.Issue, error) {
	query := `
	INSERT INTO issues (title, description, status)
	VALUES ($1, $2, $3) RETURNING id
	`

	err := db.DB.QueryRow(query,
		input.Title,
		input.Description,
		"pending",
	).Scan(&input.ID)

	if err != nil {
		return input, err
	}

	input.Status = "pending"
	return input, nil
}

func GetIssues() ([]models.Issue, error) {
	rows, err := db.DB.Query("SELECT id, title, description, status FROM issues")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var issues []models.Issue

	for rows.Next() {
		var issue models.Issue
		err := rows.Scan(&issue.ID, &issue.Title, &issue.Description, &issue.Status)
		if err != nil {
			return nil, err
		}
		issues = append(issues, issue)
	}

	return issues, nil
}

func UpdateIssue(id string, input models.Issue) error {
	query := `
	UPDATE issues
	SET title = $1, description = $2
	WHERE id = $3
	`

	result, err := db.DB.Exec(query,
		input.Title,
		input.Description,
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
	query := "DELETE FROM issues WHERE id = $1"

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