from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'eseria_core.apps.core' # <-- The Sidonian Namespace
    verbose_name = 'Eseria Sovereign Core'