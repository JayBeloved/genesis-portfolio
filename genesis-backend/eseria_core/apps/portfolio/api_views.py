from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import PortfolioAsset, LibraryArticle, AssetMedia
from .serializers import PortfolioAssetSerializer, LibraryArticleSerializer, AssetMediaSerializer

class PortfolioAssetViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioAssetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Enforce Multi-Tenant Isolation
        if not hasattr(self.request, 'tenant') or not self.request.tenant:
            return PortfolioAsset.objects.none()
            
        qs = PortfolioAsset.objects.filter(tenant=self.request.tenant)
        
        # Public users only see published assets
        if not (self.request.user and self.request.user.is_authenticated):
            qs = qs.filter(is_published=True)
            
        # Support slug querying for detail pages
        slug = self.request.query_params.get('slug', None)
        if slug:
            qs = qs.filter(slug=slug)
            
        return qs

    def perform_create(self, serializer):
        serializer.save(tenant=self.request.tenant)

class LibraryArticleViewSet(viewsets.ModelViewSet):
    serializer_class = LibraryArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Enforce Multi-Tenant Isolation
        if not hasattr(self.request, 'tenant') or not self.request.tenant:
            return LibraryArticle.objects.none()
            
        qs = LibraryArticle.objects.filter(tenant=self.request.tenant)
        
        # Public users only see published assets
        if not (self.request.user and self.request.user.is_authenticated):
            qs = qs.filter(is_published=True)
            
        slug = self.request.query_params.get('slug', None)
        if slug:
            qs = qs.filter(slug=slug)
            
        return qs

    def perform_create(self, serializer):
        serializer.save(tenant=self.request.tenant, author=self.request.user)

class AssetMediaViewSet(viewsets.ModelViewSet):
    serializer_class = AssetMediaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not hasattr(self.request, 'tenant') or not self.request.tenant:
            return AssetMedia.objects.none()
        qs = AssetMedia.objects.filter(tenant=self.request.tenant)
        portfolio_id = self.request.query_params.get('portfolio_id')
        if portfolio_id:
            qs = qs.filter(portfolio_asset_id=portfolio_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(tenant=self.request.tenant)
