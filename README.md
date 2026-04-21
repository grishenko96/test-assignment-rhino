# Notes App

A lightweight sticky-notes board with a React frontend, NestJS API, and PostgreSQL database.

## Features

- Create, edit, delete notes
- Drag notes across the board
- Auto-save note text and position
- Change note color themes

## Project Structure

- `notes-app/` - React + Vite frontend served by nginx in Docker
- `notes-api/` - NestJS API with TypeORM migrations
- `docker-compose.yaml` - local Docker setup for app, API, database, and migration runner

## Quick Start With Docker

Build and run the full stack:

```bash
docker compose up --build
```

Open the app:

```text
http://localhost:8000
```

In Docker, the browser talks to nginx on `localhost:8000`. nginx proxies `/api/*` to the API container internally. The API container is not published directly to the host by default.

The database is published for local inspection on:

```text
localhost:5400
```

Migrations run automatically through the `notes-api-migrate` service before `notes-api` starts.

## Local Development Without Docker

### Database

Start PostgreSQL locally:

```bash
docker run --rm \
  -p 5400:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=notabigsecret \
  -e POSTGRES_DB=postgres \
  postgres:16-alpine
```

### API

Create or update `notes-api/.env`:

```env
APP_PORT=4001
DB_HOST=localhost
DB_PORT=5400
DB_USERNAME=postgres
DB_PASSWORD=notabigsecret
DB_NAME=postgres
CORS_ORIGIN=http://localhost:5173,http://localhost:8000
THROTTLE_TTL_MS=60000
THROTTLE_LIMIT=100
LOG_LEVEL=debug
```

Install dependencies, run migrations, and start the API:

```bash
cd notes-api
npm install
npm run migration:run
npm run start:dev
```

The local API is available at:

```text
http://localhost:4001/api/notes
```

### Frontend

Create or update `notes-app/.env`:

```env
VITE_NOTES_API_URL=http://localhost:4001/api
```

Install dependencies and start Vite:

```bash
cd notes-app
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Environment Variables

API:

- `APP_PORT` - API port, for example `4001` locally or `3000` in Docker
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USERNAME` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
- `CORS_ORIGIN` - comma-separated list of allowed browser origins
- `THROTTLE_TTL_MS` - rate-limit window in milliseconds
- `THROTTLE_LIMIT` - max requests per rate-limit window
- `LOG_LEVEL` - Pino log level, for example `debug` locally or `info` in production

Frontend:

- `VITE_NOTES_API_URL` - API base URL used by the browser app

For production, set environment variables in the deployment environment instead of committing real secrets. `CORS_ORIGIN` should contain the production frontend origin, not localhost.

## Useful Scripts

API:

```bash
cd notes-api
npm run build
npm run start:dev
npm run migration:run
npm run migration:revert
npm test
```

Frontend:

```bash
cd notes-app
npm run build
npm run dev
npm run lint
```

## Docker Images

Build and run the API image manually:

```bash
cd notes-api
docker build -t notes-api .
docker run --rm -p 3000:3000 --env-file .env notes-api
```

Build and run the frontend image manually:

```bash
cd notes-app
docker build --build-arg VITE_NOTES_API_URL=/api -t notes-app .
docker run --rm -p 8000:8080 notes-app
```

## Security Notes

- CORS is restricted through `CORS_ORIGIN`.
- Global API rate limiting is enabled through `@nestjs/throttler`.
- API logs use Pino structured logging through `nestjs-pino`.
- Runtime containers run without root privileges where possible.
- `notes-api` and `notes-app` use `read_only`, `tmpfs`, `cap_drop: ALL`, and `no-new-privileges` in Docker Compose.
- The current local database password is for development only. Use deployment secrets in production.
