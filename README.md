# Prompt Nexus 🚀

A full-stack Prompt Management application built using Django, Angular, PostgreSQL, and Redis.

## 🔧 Tech Stack

* **Frontend**: Angular
* **Backend**: Django
* **Database**: PostgreSQL
* **Cache**: Redis

## ✨ Features

* Create prompts
* View all prompts
* View prompt details
* Track prompt views using Redis

## 🚀 API Endpoints

### Get all prompts

```
GET /prompts/
```

### Create a prompt

```
POST /prompts/
```

### Get prompt by ID

```
GET /prompts/<uuid>/
```

## ⚡ Redis Integration

* Tracks how many times a prompt is viewed
* Uses in-memory caching for performance

## 📁 Project Structure

```
backend/
  core/
  prompts/
```

## 🚀 How to Run

```bash
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

## 📌 Future Improvements

* Authentication (JWT)
* Tagging system
* Search & filtering
* Docker setup
