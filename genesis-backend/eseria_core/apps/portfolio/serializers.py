from rest_framework import serializers
from .models import PortfolioAsset, LibraryArticle, AssetMedia

class AssetMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetMedia
        fields = '__all__'
        read_only_fields = ['id', 'tenant', 'created_at', 'updated_at']

class PortfolioAssetSerializer(serializers.ModelSerializer):
    media_gallery = AssetMediaSerializer(many=True, read_only=True)

    class Meta:
        model = PortfolioAsset
        fields = '__all__'
        read_only_fields = ['id', 'tenant', 'created_at', 'updated_at']

class LibraryArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryArticle
        fields = '__all__'
        read_only_fields = ['id', 'tenant', 'created_at', 'updated_at', 'author']
