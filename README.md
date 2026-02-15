# Notes App (Frontend + API)

A lightweight sticky‑notes board: create notes, drag them around, edit text with auto‑save, change colors, and delete.

## Features

- Create, edit, delete notes
- Drag notes across the board
- Auto‑save text and position
- Color palette per note

## Structure

- `notes-app/` — React frontend
- `notes-api/` — NestJS API
- `docker-compose.yaml` — local orchestration (app + api + db)

## Quick Start (Docker)

Build and run everything:

```bash
docker compose up --build
```

Open:

- App: `http://localhost:8080`
- API: `http://localhost:4000/api/notes`

Notes:
- The app is built with `VITE_NOTES_API_URL=/api` and proxies through nginx to the API.
- Migrations run automatically on startup via a one‑off container.

## Local Dev (without Docker)

### API

1. Set env in `notes-api/.env`:
   - `APP_PORT=3000`
   - `DB_HOST=localhost`
   - `DB_PORT=5430`
   - `DB_USERNAME=postgres`
   - `DB_PASSWORD=notabigsecret`
   - `DB_NAME=postgres`
2. Run database (example):

```bash
docker run --rm -p 5430:5432 -e POSTGRES_PASSWORD=notabigsecret -e POSTGRES_DB=postgres postgres:16-alpine
```

3. Run migrations:

```bash
cd notes-api
npm run migration:run
```

4. Start API:

```bash
cd notes-api
npm run start:dev
```

### App

1. Set env in `notes-app/.env`:
   - `VITE_NOTES_API_URL=http://localhost:3000/api/`

2. Start app:

```bash
cd notes-app
npm run dev
```

Open `http://localhost:5173`.

## Scripts

API:

```bash
cd notes-api
npm run build
npm run start:dev
npm run migration:run
```

App:

```bash
cd notes-app
npm run build
npm run dev
```

## Docker Images

API:

```bash
cd notes-api
docker build -t notes-api .
docker run --rm -p 3000:3000 --env-file .env notes-api
```

App:

```bash
cd notes-app
docker build -t notes-app .
docker run --rm -p 8080:80 notes-app
```
