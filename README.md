# 🚀 CivicTrack – Civic Issue Management System

CivicTrack is a backend system that allows users to report and track civic issues such as potholes, garbage overflow, water leaks, and more.

This project is built using Go (Golang) and follows clean backend architecture practices.

---

## 📌 Features

- Define and manage issue data models  
- Track issue status  
- RESTful API design  
- Clean backend architecture (handlers, services, models)  

---

## 🛠 Tech Stack

- Go (Golang)  
- Gin Framework  
- REST APIs  

---

## 📌 Current Status

- Basic server setup ✅  
- Route handling using Gin ✅  
- Project structured using handlers ✅  
- Issue data model implemented ✅  
- API returning structured JSON response ✅
- Create Issue API (POST /issues) ✅
- Get Issues API (GET /issues) ✅
- Get Issue by ID API (GET /issues/:id) ✅
- Update Issue API (PUT /issues/:id) ✅
- Delete Issue API (DELETE /issues/:id) ✅
- PostgreSQL integration completed ✅
- Full CRUD APIs using database ✅
- Error handling implemented (404, 500) ✅
- Dynamic routing using path parameters (:id) ✅

## 📁 Project Structure

```
civictrack/
├── backend/                      # Go backend (API + business logic)
│   ├── internal/
│   │   ├── db/
│   │   │   └── db.go             # Database connection setup
│   │   ├── handlers/
│   │   │   └── health_handler.go # Health check endpoint
│   │   ├── models/
│   │   │   └── issue.go          # Issue data model
│   │   ├── services/
│   │   │   └── issue_service.go  # Business logic for issues
│   ├── main.go                   # Entry point of backend server
│   ├── go.mod                    # Go module dependencies
│   └── go.sum                    # Dependency checksums
│
├── Frontend/                    # Next.js frontend (UI)
│   ├── app/
│   │   ├── globals.css          # Global styles & design system
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main dashboard page
│   │
│   ├── components/
│   │   ├── dashboard-container.tsx # Main state container
│   │   ├── issue-card.tsx          # Issue display card
│   │   ├── issue-form.tsx          # Create/Edit issue form
│   │   ├── issue-skeleton.tsx      # Loading skeleton UI
│   │   ├── issues-list.tsx         # Issues grid/list
│   │   └── delete-dialog.tsx       # Delete confirmation modal
│   │
│   ├── hooks/
│   │   └── use-issues.ts           # Custom hook for issue management
│   │
│   ├── lib/
│   │   └── api.ts                  # API client (TypeScript)
│   │
│   └── public/                    # Static assets
│
└── README.md
```

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/lochit-vinay/civictrack.git

# 2. Navigate to project
cd civictrack

# 3. Run the server
go run main.go

# 4. Open in browser
http://localhost:8080/
