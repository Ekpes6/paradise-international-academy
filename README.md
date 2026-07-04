# Paradise International Academy — School Management Website

Production-grade school management website for **paradiseinternationalacademy.com.ng** covering Crèche, Nursery, Primary, and Secondary schools.

---

## Architecture

```
                    ┌──────────────────┐
                    │   Nginx (80/443)  │  ← paradiseinternationalacademy.com.ng
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             ▼                               ▼
     ┌───────────────┐              ┌───────────────┐
     │   Frontend    │              │  API Gateway  │  :8080
     │  React + Vite │              │  Spring Cloud │
     └───────────────┘              └───────┬───────┘
                                            │
          ┌──────────────┬─────────────┬────┴──────────┬──────────────┐
          ▼              ▼             ▼                ▼              ▼
   ┌────────────┐ ┌────────────┐ ┌──────────┐ ┌────────────┐ ┌────────────────┐
   │Auth Service│ │CMS Service │ │Admission │ │  Student   │ │Payment Service │
   │  :8081     │ │  :8082     │ │  :8083   │ │  :8084     │ │   :8085        │
   └────────────┘ └────────────┘ └──────────┘ └────────────┘ └────────────────┘
          │              │             │                                │
          │         ┌────┴────┐        └──────────── RabbitMQ ─────────┘
          │         │Notification│                                      │
          │         │  :8086   │◄─────────────────────────────────────┘
          │         └──────────┘
          │
    ┌─────▼─────────────────────────────────────────────┐
    │           MySQL 8  |  Redis  |  MinIO             │
    └───────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 5, Tailwind CSS, Framer Motion |
| Backend | Java 17, Spring Boot 3.2, Spring Cloud Gateway |
| Database | MySQL 8 (7 schemas), Redis (caching) |
| Messaging | RabbitMQ |
| File Storage | MinIO (S3-compatible) |
| Auth | JWT (JJWT 0.12) + BCrypt |
| Payments | Paystack |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Reverse Proxy | Nginx |

## Color Scheme

| Color | Hex | Usage |
|---|---|---|
| Primary Red | `#cc0000` | Primary buttons, headings, hero |
| Deep Red | `#660000` | Footer, dark sections |
| Green | `#008751` | Secondary buttons, section labels |
| Yellow | `#ffd100` | Accents, CTAs, highlights |
| White | `#ffffff` | Backgrounds, text on dark |

---

## Quick Start (Development)

### Prerequisites
- Docker Desktop 24+
- Node.js 20+
- Java 17+ & Maven 3.9+

### 1. Clone & configure environment
```bash
git clone https://github.com/your-org/paradise-academy.git
cd paradise-academy
cp .env.example .env
# Edit .env — fill in JWT_SECRET, Paystack keys, SMTP credentials
```

### 2. Start all services
```bash
docker compose up -d
```

Services will be available at:
| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API Gateway | http://localhost:8080 |
| Auth Service | http://localhost:8081/swagger-ui.html |
| CMS Service | http://localhost:8082/swagger-ui.html |
| RabbitMQ Admin | http://localhost:15672 (pia_rabbit / see .env) |
| MinIO Console | http://localhost:9001 |

### 3. Frontend development (hot-reload)
```bash
cd frontend
npm install
npm run dev
```

### 4. Build backend services
```bash
cd services
mvn clean package -DskipTests
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `JWT_SECRET` | 256-bit Base64 secret for JWT signing |
| `PAYSTACK_SECRET_KEY` | Paystack secret key (sk_live_...) |
| `PAYSTACK_WEBHOOK_SECRET` | Paystack webhook secret |
| `MAIL_USERNAME` | SMTP email address |
| `MAIL_PASSWORD` | SMTP password / app password |
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public key (pk_live_...) |

---

## Default Admin Credentials

After `docker compose up`, the database is seeded with:

| Field | Value |
|---|---|
| Email | `admin@paradiseinternationalacademy.com.ng` |
| Password | `Admin@Paradise2024!` |

**Change this immediately in production.**

---

## Project Structure

```
paradiseIntl-academy/
├── frontend/                  # React + Vite SPA
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── home/          # Homepage sections
│   │   │   ├── layout/        # Header, Footer
│   │   │   └── ui/            # WhatsApp, Spinner, etc.
│   │   ├── pages/             # Route pages
│   │   │   └── portals/       # Student / Parent / Admin portals
│   │   └── types/             # TypeScript interfaces
│   ├── Dockerfile
│   └── nginx.conf
├── services/                  # Spring Boot microservices
│   ├── api-gateway/           # Spring Cloud Gateway (port 8080)
│   ├── auth-service/          # JWT auth (port 8081)
│   ├── cms-service/           # News, Gallery, Events (port 8082)
│   ├── admission-service/     # Admissions (port 8083)
│   ├── student-service/       # Student records (port 8084)
│   ├── payment-service/       # Paystack (port 8085)
│   └── notification-service/  # Email/SMS/WhatsApp (port 8086)
├── mysql/
│   └── init/                  # SQL initialization scripts
├── nginx/
│   └── nginx.conf             # Reverse proxy config
├── .github/
│   └── workflows/             # CI/CD pipelines
├── docker-compose.yml
└── .env.example
```

---

## Portals

| Portal | URL | Role |
|---|---|---|
| Student Portal | `/portal/student` | STUDENT |
| Parent Portal | `/portal/parent` | PARENT |
| Admin Panel | `/portal/admin` | ADMIN |
| Login | `/portal/login` | All |

---

## API Endpoints

### Auth (`/api/auth`)
- `POST /api/auth/login` — Authenticate user
- `POST /api/auth/register` — Register new user

### Admissions (`/api/admissions`)
- `POST /api/admissions/apply` — Submit application (public)
- `GET /api/admissions/track/{appNumber}` — Track application status
- `GET /api/admissions` — List all (Admin only)
- `PATCH /api/admissions/{id}/status` — Update status (Admin only)

### News (`/api/news`)
- `GET /api/news` — Paginated published articles
- `GET /api/news/{slug}` — Single article
- `POST /api/news` — Create (Admin only)

### Payments (`/api/payments`)
- `POST /api/payments/initiate` — Initiate payment
- `GET /api/payments/{reference}` — Get payment status
- `POST /api/payments/webhook` — Paystack webhook

---

## Deployment

Push to `main` branch triggers the GitHub Actions deploy pipeline which:
1. Builds all Docker images
2. Pushes to Docker Hub
3. SSHs into VPS and runs `docker compose up -d`

Configure these GitHub Secrets:
- `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`
- `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`

---

## License

Private — All Rights Reserved © Paradise International Academy 2024
