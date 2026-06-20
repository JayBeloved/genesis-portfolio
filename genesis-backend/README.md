# The Logic Fortress (genesis-backend)

This is the backend component of the **ESERIA Sovereign Architecture**. Built on Django 4.2 LTS and Django REST Framework, it acts as the multi-tenant gatekeeper and single source of truth for the ecosystem.

## Tech Stack
- **Framework:** Django 4.2 LTS
- **API Engine:** Django REST Framework (DRF) 3.17+
- **Database:** PostgreSQL (via psycopg) / SQLite3 (for local dev)
- **Authentication:** djangorestframework-simplejwt (JWT)

## Architecture & Features

### The Multi-Tenant Gatekeeper
To allow for thousands of individual portfolios without creating thousands of databases, the system uses strict row-level multi-tenancy. Custom middleware intercepts HTTP requests, querying the `Domain` table to attach the correct `Tenant` context.

### The Sovereign Identity Schema
The default Django user model is discarded. `SovereignUser` relies strictly on email-first authentication, eliminating legacy username friction.

### Standardized API Protocol
All frontend-facing API endpoints return a predictable, immutable JSON structure via the `EseriaJSONRenderer`:
```json
{
  "success": true,
  "message": "Operation successful.",
  "data": { ... },
  "errors": null
}
```

## Getting Started

1. **Virtual Environment:** Set up a Python virtual environment and activate it.
2. **Dependencies:** Install the required dependencies.
3. **Database:** Apply migrations `python manage.py migrate`.
4. **Run Server:** Start the development server `python manage.py runserver`.
