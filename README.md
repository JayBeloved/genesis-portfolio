# ESERIA Sovereign Architecture: Master Seed

This repository serves as the digital incarnation of mastery, expertise, and industry relevance. It is built upon the **ESERIA Sovereign Architecture**, a distributed headless ecosystem designed for maximum scalability, data sovereignty, and zero-friction deployment.

## Architectural Philosophy

The ecosystem is decoupled into two primary sovereign entities:

### 1. The Logic Fortress (`genesis-backend`)
A centralized, multi-tenant Django/Django REST Framework API backend. It acts as the single source of truth for identity, data relationships, and business logic.
- **Multi-Tenancy:** Row-level isolation via Tenant models to serve multiple domains/portfolios from one codebase.
- **Unified Identity:** Email-first Single Sign-On (SSO) via JWT.
- **Standardized API:** Enforces an immutable JSON response protocol globally.

### 2. The UI Forge (`genesis-frontend`)
A highly optimized Next.js 15 frontend that consumes the Logic Fortress API to render dynamic, tenant-specific interfaces.
- **Dynamic Theming:** Server-side injected, JSON-driven CSS variables for instant white-label readiness.
- **Aesthetic Excellence:** Built with Tailwind CSS, Framer Motion, and a "Noiseless" design system to reflect premium authority.
- **Interactive Capabilities:** Features like "The Engineering Altar" provide an embedded CLI experience.

## The Mission
To act as the "Monolithic Seed" — a foundational platform from which digital authority, executive dossiers, and comprehensive engineering portfolios can be spawned instantly.

## Directory Structure

- `/genesis-backend/`: The Django REST API (eseria_core).
- `/genesis-frontend/`: The Next.js frontend application.
- `/.docs/`: Architectural specifications and requirement documents.

## Getting Started

### Backend
1. Navigate to `genesis-backend`.
2. Set up your Python virtual environment.
3. Install dependencies and run migrations via `manage.py`.
4. Start the Django server.

### Frontend
1. Navigate to `genesis-frontend`.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the Next.js development server.
