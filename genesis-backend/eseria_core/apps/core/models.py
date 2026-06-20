import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager



class Tenant(models.Model):
    """
    The Sovereign Container. 
    (e.g., 'Uncaved: John J Lawal', 'SIFLUX: Retailer A')
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    # ESERIA Dynamic Theming Engine
    theme_config = models.JSONField(default=dict, blank=True, help_text="CSS variables, logos, and UI preferences.")

    def __str__(self):
        return self.name

# ==========================================
# THE SEO ARCHITECTURE
# ==========================================
class SEOBaseModel(models.Model):
    """
    Abstract SEO primitive. Inherited by all content models.
    """
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.TextField(max_length=160, blank=True)
    keywords = models.CharField(max_length=255, blank=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        abstract = True

class Domain(models.Model):
    """
    The Router. Maps incoming Next.js requests to the correct Tenant.
    """
    domain_name = models.CharField(max_length=255, unique=True, db_index=True)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='domains')
    is_primary = models.BooleanField(default=True)

    def __str__(self):
        return self.domain_name


# ==========================================
# THE SOVEREIGN MANAGER
# ==========================================
class SovereignUserManager(BaseUserManager):
    """
    Custom manager to handle email-only authentication.
    """

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The ESERIA standard requires a valid email address.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


# ==========================================
# THE SOVEREIGN USER
# ==========================================
class SovereignUser(AbstractUser):
    """
    The Global Identity Layer. Email-only authentication.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, db_index=True)

    # Strip the default username requirement
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # Link the custom manager!
    objects = SovereignUserManager()

    def __str__(self):
        return self.email


class TenantMembership(models.Model):
    """
    The Gatekeeper. Connects a SovereignUser to a specific Tenant.
    """
    ROLE_CHOICES = [
        ('OWNER', 'Tenant Owner'),
        ('ADMIN', 'Administrator'),
        ('USER', 'Standard User'),
    ]
    user = models.ForeignKey(SovereignUser, on_delete=models.CASCADE, related_name='memberships')
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='members')
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='USER')

    class Meta:
        unique_together = ('user', 'tenant')

    def __str__(self):
        return f"{self.user.email} -> {self.tenant.name} ({self.role})"