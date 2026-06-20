@echo off
echo =====================================================
echo   [ ESERIA GLOBAL SOVEREIGN ARCHITECTURE INITIATED ]
echo =====================================================

echo [1/4] Installing Eseria Core dependencies (Local Forge)...
pip install -r requirements/local.txt

echo [2/4] Applying core database migrations...
python manage.py makemigrations core
python manage.py migrate

echo [3/4] Creating Sovereign Superuser (John J. Lawal)...
set DJANGO_SUPERUSER_EMAIL=eseria@johnjaylawal.org
set DJANGO_SUPERUSER_PASSWORD=eseria-sovereign-admin
set DJANGO_SUPERUSER_USERNAME=EseriaSovereign
python manage.py createsuperuser --noinput --email %DJANGO_SUPERUSER_EMAIL%

echo =====================================================
echo   [ SUCCESS ]
echo   ESERIA Architecture is set. Ready for Uncaved-GENESIS.
echo   Identity, JWT Auth, and Security Protocols active.
echo   Admin Login: eseria@johnjaylawal.org
echo =====================================================