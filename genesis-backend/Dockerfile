# Stage 1: Build dependencies
FROM python:3.11-slim-bookworm AS builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY requirements/ /app/requirements/

# Install build dependencies and compile wheels
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels \
    -r requirements/production.txt

# Stage 2: Final runtime image (The Sidonian Edge: Zero Waste)
FROM python:3.11-slim-bookworm

ENV DJANGO_SETTINGS_MODULE="eseria_core.settings.production"

# Create a non-root user for security (Shift-Left Security)
RUN addgroup --system eseria && adduser --system --home /home/eseria --group eseria

WORKDIR /app

# Install only runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy compiled wheels from builder and install
COPY --from=builder /usr/src/app/wheels /wheels
RUN pip install --no-cache /wheels/*

COPY . .

# Collect static files for WhiteNoise
RUN SECRET_KEY="dummy" DATABASE_URL="sqlite:////tmp/db.sqlite3" python manage.py collectstatic --noinput

# Transfer ownership to non-root user
RUN chown -R eseria:eseria /app
USER eseria

# Gunicorn setup for robust concurrent handling
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "--workers", "3", "--threads", "2", "eseria_core.wsgi:application"]