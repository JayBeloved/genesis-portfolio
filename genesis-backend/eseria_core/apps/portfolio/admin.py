from django.contrib import admin
from .models import PortfolioAsset, DataAnchor, LibraryArticle, AssetMedia

@admin.register(PortfolioAsset)
class PortfolioAssetAdmin(admin.ModelAdmin):
    list_display = ('title', 'tenant', 'anchor_type', 'is_published')
    list_filter = ('tenant', 'anchor_type', 'is_published')
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}

@admin.register(DataAnchor)
class DataAnchorAdmin(admin.ModelAdmin):
    list_display = ('identifier', 'title', 'tenant', 'is_active')
    list_filter = ('tenant', 'is_active')
    search_fields = ('identifier', 'title')

@admin.register(LibraryArticle)
class LibraryArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'tenant', 'author', 'is_published')
    list_filter = ('tenant', 'is_published')
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}

@admin.register(AssetMedia)
class AssetMediaAdmin(admin.ModelAdmin):
    list_display = ('portfolio_asset', 'tenant', 'alt_text')
