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

## 📂 Project Structure

```bash
civictrack/
├── internal/
│   ├── db/
│   │   └── db.go
│   ├── handlers/
│   │   └── health_handler.go
│   ├── models/
│   │   └── issue.go
│   ├── services/
│   │   └── issue_service.go
├── main.go
├── go.mod
├── go.sum
├── README.md
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
