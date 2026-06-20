from .base import *

# Activate Development Mode
DEBUG = True

if DEBUG:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.johnjaylawal.local']

# Add Debug Toolbar for Query Optimization
INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')
INTERNAL_IPS = ['127.0.0.1']

# Open CORS completely for local Next.js development
CORS_ALLOW_ALL_ORIGINS = True

# Use SQLite locally to remove friction from starting
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}