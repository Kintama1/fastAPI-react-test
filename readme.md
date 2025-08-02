# React + FastAPI Development Setup

## Quick Overview
- FastAPI serves APIs (`/api/*`)
- React handles the frontend
- Single server architecture for production

Essentially we will test both development and production locally as we can build our react frontend locally and have main.py serve it.

## Development Setup

### 1. Install Dependencies
```bash
pip install fastapi uvicorn python-multipart
cd react-app && npm install
```

### 2. Add Proxy to React
In your React `package.json`:
```json
{
  "name": "your-app",
  "proxy": "http://localhost:8000",
  "dependencies": { ... }
}
```

### 3. Run Both Servers
**Terminal 1 - FastAPI:**
```bash
uvicorn main:app --reload --port 8000
```

**Terminal 2 - React:**
```bash
npm start  # Runs on port 3000
```

### 4. Develop
- **Frontend changes**: `localhost:3000` (hot reload)
- **API changes**: Edit `main.py` (auto reload)
- **API calls**: Automatically proxied from React to FastAPI

## Production Preparation

### 1. Build React
```bash
npm run build
```

### 2. FastAPI Serves Everything
Your `main.py` already handles this:
```python
# API routes
@app.get("/api/users")
def get_users(): ...

# Static files (React build)
app.mount("/static", StaticFiles(directory="build/static"))

# Catch-all (serves React for routing)
@app.get("/{full_path:path}")
def serve_react_app(): ...
```

### 3. Test Production Build
```bash
uvicorn main:app --port 8000
# Visit localhost:8000 (single server)
```

## Development vs Production

| Mode | Frontend | Backend | URL |
|------|----------|---------|-----|
| **Development** | React dev server | FastAPI | `localhost:3000` |
| **Production** | FastAPI static serving | FastAPI | `localhost:8000` |

## Common Issues
- **CORS errors**: Use the proxy, don't fetch `localhost:8000` directly
- **Cache issues**: Hard refresh (`Cmd+Shift+R`) or disable cache in dev tools
- **Static files not loading**: Check `build/` folder exists and route order in FastAPI