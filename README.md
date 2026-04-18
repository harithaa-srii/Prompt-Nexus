# Prompt Nexus

Prompt Nexus is a full-stack web application for managing AI image generation prompts.  
Users can create prompts, view them, and track how many times each prompt has been accessed using a Redis-based view counter.

---

## Tech Stack

| Layer       | Technology        |
|------------|------------------|
| Frontend   | Angular          |
| Backend    | Django (no DRF)  |
| Database   | PostgreSQL       |
| Cache      | Redis            |
| DevOps     | Docker Compose   |

---

## Features

### Backend
- Prompt model with:
  - id (UUID)
  - title
  - content
  - complexity (1–10)
  - created_at
- REST API endpoints:
  - `GET /prompts/` → list all prompts
  - `POST /prompts/` → create a prompt
  - `GET /prompts/:id/` → get prompt details
- Redis integration:
  - Each time a prompt is viewed, a counter is incremented
  - View count is stored in Redis (not in PostgreSQL)

---

### Frontend
- Prompt List Page
  - Displays all prompts
  - Shows complexity using color badges
- Prompt Detail Page
  - Displays full content
  - Shows live view count from Redis
- Create Prompt Page
  - Form with validations:
    - Title: minimum 3 characters
    - Content: minimum 20 characters
    - Complexity: between 1 and 10
  
---

## How It Works (High-Level Flow)

1. User opens the frontend (Angular app)
2. Angular calls Django APIs
3. Django:
   - Reads/writes prompt data from PostgreSQL
   - Updates view count in Redis
4. Response is sent back to frontend and displayed

---

## Project Structure

```
PromptNexus/
├── backend/
│ ├── core/ # Django project config
│ ├── prompts/ # App (models, views, APIs)
│ ├── Dockerfile
│ └── requirements.txt
├── frontend/
│ ├── src/ # Angular app
│ ├── Dockerfile
│ └── package.json
├── docker-compose.yml # Runs entire stack
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Docker Desktop installed
- Docker is running

---

## Run the Application

From the project root:
```bash
docker-compose up --build
```
This will start:
- Frontend (Angular)
- Backend (Django)
- PostgreSQL database
- Redis cache

## Access the Application
Table of services and URLs:
| Service | URL                            |
|---------|--------------------------------|
| Frontend | http://localhost:4200         |
| Backend | http://localhost:9000/prompts/ |

## Testing the Application
1. Open the frontend:
   - Go to [http://localhost:4200](http://localhost:4200)
2. Create a prompt:
   - Click "Create Prompt"
   - Fill the form and submit.
3. View prompts:
   - Return to list page.
   - Click any prompt.
4. Verify Redis view count:
   - Open a prompt detail page.
   - Refresh multiple times.
   - View count should increase.
 
## Important Notes

- The database starts empty when Docker runs for the first time.
- You need to create prompts manually using the UI.
- Redis is used only for view counting and not for storing prompt data.
- View count is not persisted in PostgreSQL.

## Architectural Decisions

- Used standalone components instead of NgModules for a simpler and more modern Angular architecture.
- Organized the application into clear layers:
  - Components → responsible for UI rendering (Prompt List, Detail, Create)
  - Services → responsible for API communication (PromptService)
- Centralized all HTTP calls inside a service to avoid duplication and improve maintainability.
- Used environment-based configuration to manage API URLs (local vs Docker environments).
- Kept components lightweight by handling data fetching through services and using async patterns.

## 1. Why Django without DRF?
- To follow the assignment requirement and demonstrate manual API handling using Django views.

## 2. Why Redis for view_count?
- Faster than database writes
- Suitable for frequently updated values
- Avoids unnecessary load on PostgreSQL

## 3. Why Docker?
- Ensures consistent setup across machines
- Allows running full stack with a single command
- Isolates services (frontend, backend, db, cache)

## 4. Frontend Design Choices
- Standalone Angular components for modular structure
- Service layer for API calls
- Environment-based configuration for API URLs

## Future Improvements
- Add authentication (JWT/session)
- Add tagging system for prompts
- Add search and filtering
- Deploy to cloud (Render, Railway, GCP)

## Conclusion
This project demonstrates:
- Full-stack development (Angular + Django)
- API design without DRF
- Redis caching integration
- PostgreSQL usage
- Docker-based deployment
