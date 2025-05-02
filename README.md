# cowris-assessment

# Multi-Backend Dockerized Setup with Vue Frontend

This project contains a Vue.js frontend that can connect to three different backend services: NestJS, Express.js, and Laravel. Each backend is containerized and runs independently. The purpose of this setup is to demonstrate flexibility in backend integration using a shared frontend.

## Project Overview

- **Frontend:** Vue.js (connects to any of the backends)
- **Backends:**
  - **NestJS** – Runs on port 8005 (Dockerized)
  - **Express.js** – Runs on port 3000 (Dockerized)
  - **Laravel** – Runs on port 80 (using Laravel Sail)

## How to Run

### NestJS (port 8005)

Navigate to the project root and run:

docker compose up --build

This builds and starts the NestJS container. It will be available at:

http://localhost:8005

### Express.js (port 3000)

Also starts with:

docker compose up --build

The Express app will be available at:

http://localhost:3000

### Laravel (via Sail, port 80)

From the `laravel` directory, run:

./vendor/bin/sail up

This starts the Laravel application using Laravel Sail. Make sure dependencies are installed using:

composer install

Then the app will be accessible at:

http://localhost:8000

## Frontend Setup

The frontend is located in the `frontend` directory and can be configured to connect to any backend using environment variables or runtime config.

To start the frontend:

cd frontend
npm install
npm run dev

## Notes

- All services are independent and can be tested separately.
- Use `docker compose up --build --no-cache` to force a clean rebuild.
- Make sure Docker and Docker Compose are installed.
- Laravel runs in a separate container environment via Sail and is not included in the general `docker compose` workflow.

## API Testing

Verify each backend with tools like curl or Postman:

curl http://localhost:8005/api # NestJS
curl http://localhost:3000/api # Express.js
curl http://localhost:8000/api # Laravel
