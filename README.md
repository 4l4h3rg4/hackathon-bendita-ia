<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1WFWhwnRxuqTqrXoBQ6aJIz3jCePnxZT1

## Run Locally

### Prerequisites
- Node.js & pnpm
- Python 3.8+
- Supabase Account (or local instance)

### 1. Backend Setup
The backend is a FastAPI application using Supabase.

```bash
cd backend
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```
*The backend runs on http://localhost:8000*

### 2. Frontend Setup
The frontend is a React + Vite application.

```bash
# (In the project root)
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```
*The frontend runs on http://localhost:5173*

### 3. Database Setup
The project uses Supabase. The database connection is configured in `backend/.env`.
To seed the database with initial data:
```bash
cd backend
python3 -m app.seed
```
