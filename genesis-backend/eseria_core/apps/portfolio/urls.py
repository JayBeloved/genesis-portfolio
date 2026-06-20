from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import generate_star
from .api_views import PortfolioAssetViewSet, LibraryArticleViewSet, AssetMediaViewSet

router = DefaultRouter()
router.register(r'portfolio', PortfolioAssetViewSet, basename='portfolio')
router.register(r'library', LibraryArticleViewSet, basename='library')
router.register(r'media', AssetMediaViewSet, basename='media')

urlpatterns = [
    path('content/generate-star/', generate_star, name='generate_star'),
    path('', include(router.urls)),
]
