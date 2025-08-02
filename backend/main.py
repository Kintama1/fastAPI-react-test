from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# API routes first
@app.get("/api/test")
def test_endpoint():
    return {"data": "This is from the API"}

# Add this to your existing main.py, after the test endpoint
@app.get("/api/users")
def get_users():
    return {
        "users": [
            {"id": 1, "name": "Michigan", "email": "alice@example.com"},
            {"id": 2, "name": "Bob", "email": "bob@example.com"},
            {"id": 3, "name": "Charlie", "email": "charlie@example.com"}
        ]
    }

@app.get("/api/users/{user_id}")
def get_user(user_id: int):
    users = {
        1: {"id": 1, "name": "Michigan", "email": "alice@example.com"},
        2: {"id": 2, "name": "Bob", "email": "bob@example.com"},
        3: {"id": 3, "name": "Charlie", "email": "charlie@example.com"}
    }
    if user_id in users:
        return users[user_id]
    return {"error": "User not found"}

# Mount static files
app.mount("/static", StaticFiles(directory="build/static"), name="static")

# Only catch non-static, non-api routes
@app.get("/")
@app.get("/{full_path:path}")
def serve_react_app(full_path: str = ""):
    # Explicitly avoid static paths
    if not full_path.startswith("static") and not full_path.startswith("api"):
        return FileResponse("build/index.html")
    

