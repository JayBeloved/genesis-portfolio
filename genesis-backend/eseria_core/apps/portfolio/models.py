import uuid
from django.db import models
from django.utils.text import slugify
from django.utils.text import slugify
from eseria_core.apps.core.models import Tenant, SEOBaseModel

# ==========================================
# THE ARCHITECTURAL BASE
# ==========================================
class TenantAwareModel(models.Model):
    """
    Abstract base class. Enforces that every piece of data 
    in the ESERIA ecosystem belongs to a specific Tenant.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="%(class)ss")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# ==========================================
# MODEL 1: THE AI-DRIVEN PORTFOLIO ASSET
# ==========================================
class PortfolioAsset(TenantAwareModel, SEOBaseModel):
    """
    The destination for the Genkit/Gemini S.T.A.R. pipeline.
    """
    ANCHOR_CHOICES = [
        ('AUDIT', 'Revenue Leakage Audit'),
        ('INTELLIGENCE', 'Data Intelligence Dashboard'),
        ('STANDARD', 'Standard Case Study'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    anchor_type = models.CharField(max_length=20, choices=ANCHOR_CHOICES, default='STANDARD')
    
    # The raw Situation, Task, Action, Result input
    raw_star_data = models.JSONField(default=dict, help_text="Raw JSON input for AI processing.")
    
    # The AI output formatted in Markdown or HTML
    published_content = models.TextField(blank=True, help_text="AI-generated, SEO-ready Markdown/HTML.")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.tenant.name}] {self.title}"

# ==========================================
# MODEL 2: THE DATA ANCHOR (FSD: SkillMetric)
# ==========================================
class DataAnchor(TenantAwareModel):
    """
    Serves hardcoded or simulated JSON payloads directly to 
    Next.js for D3.js and Recharts visualizations.
    """
    identifier = models.CharField(max_length=100, help_text="e.g., 'revenue_leakage_2026'")
    title = models.CharField(max_length=255)
    
    # This payload is what Next.js consumes for the interactive sliders
    payload = models.JSONField(default=dict, help_text="The exact JSON structure expected by Recharts/D3.js.")
    
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('tenant', 'identifier')

    def __str__(self):
        return f"{self.identifier} ({self.tenant.name})"

# ==========================================
# MODEL 3: THE DIGITAL LIBRARY
# ==========================================
class LibraryArticle(TenantAwareModel, SEOBaseModel):
    """
    For standard educational content (Apostle Niyi Library, Bootcamps).
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    content = models.TextField(help_text="Standard Markdown content.")
    
    # Link to the SovereignUser who wrote it
    author = models.ForeignKey('core.SovereignUser', on_delete=models.SET_NULL, null=True)
    
    published_date = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.tenant.name}] {self.title}"

# ==========================================
# MODEL 4: THE MEDIA GALLERY
# ==========================================
class AssetMedia(TenantAwareModel):
    """
    Sovereign Media Engine. Attaches files/images to Portfolio Assets.
    """
    portfolio_asset = models.ForeignKey('PortfolioAsset', on_delete=models.CASCADE, related_name='media_gallery')
    file = models.FileField(upload_to='portfolio_media/')
    alt_text = models.CharField(max_length=255, blank=True, help_text="SEO alt text for the image.")
    
    def __str__(self):
        return f"Media for {self.portfolio_asset.title}"
