# --------------------------
# Django Settings for DMS Core Project  :- Path :- dms-backend/dms_core/settings.py
# --------------------------

from pathlib import Path
import sys

# BASE_DIR is the root directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Adds 'apps' directory to Python path so Django can find your custom apps
sys.path.insert(0, str(BASE_DIR / "apps"))

# Secret key for cryptographic signing (keep this secret in production)
SECRET_KEY = 'django-insecure-ua5&r!miv!(qgq^3bix7e6ba91agdes36z(-v71di*lwe**2^a'

# Turn off debug in production for security (shows detailed errors if True)
DEBUG = True

# List of domain names/IPs this Django site can serve (empty means localhost only)
ALLOWED_HOSTS = []

# All Django and 3rd-party apps that are active in the project
INSTALLED_APPS = [
    # Django built-in apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party apps for APIs and authentication
    'rest_framework',
    'rest_framework_simplejwt',  # JWT authentication for APIs
    'corsheaders',               # Allows cross-origin requests (e.g. frontend on another port)
    # Your custom apps
    'users',                     # Users app for custom user model/APIs
    # Uncomment and add more as you build
    'incidents',
    'notifications',
    'updates',
    'authorities',
    'govt_body',
    # 'media_uploads',
]

# Django REST Framework settings: enforce authentication by default, use JWT
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # All API endpoints require login unless overridden
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # Use JWT for authentication
    ],
}

# Middleware is a chain of hooks for request/response processing
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Handles CORS before anything else
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Allow requests from ANY frontend origin (should be restricted in production)
CORS_ALLOW_ALL_ORIGINS = True

# The root URL configuration for your Django project
ROOT_URLCONF = 'dms_core.urls'

# Template settings: where Django looks for HTML templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Add your template directories here if needed
        'APP_DIRS': True,  # Looks for templates in each app's 'templates' folder
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI application for running Django (used in production and dev servers)
WSGI_APPLICATION = 'dms_core.wsgi.application'

# Default database: uses SQLite for development (change ENGINE for PostgreSQL, etc.)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation: enforces password strength and security
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# Tell Django to use your custom user model (not the default one)
AUTH_USER_MODEL = 'users.User'

# Internationalization/timezone settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (served at /static/)
STATIC_URL = 'static/'

# Default primary key type for new models
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

from datetime import timedelta

# SimpleJWT settings: how long tokens last, header type, etc.
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),  # Access tokens expire after 30 min
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),     # Refresh tokens expire after 1 day
    'AUTH_HEADER_TYPES': ('Bearer',),                # Authorization header starts with 'Bearer'
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}