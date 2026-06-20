import json
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from asgiref.sync import async_to_sync
from .models import PortfolioAsset
from .services.ai_pipeline import generate_portfolio_asset, SovereignAIException

# ==========================================
# ASYNC DATABASE OPERATIONS
# ==========================================
def create_portfolio_asset(tenant, star_data, generated_markdown):
    title = star_data.get('title', 'AI Generated Asset')
    anchor_type = star_data.get('anchor_type', 'STANDARD')
    
    asset = PortfolioAsset.objects.create(
        tenant=tenant,
        title=title,
        anchor_type=anchor_type,
        raw_star_data=star_data,
        published_content=generated_markdown,
        is_published=False
    )
    return asset.id

# ==========================================
# THE STAR GENERATION ENDPOINT
# ==========================================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_star(request):
    """
    Ingests S.T.A.R. JSON, pipes to Gemini, and saves to the Database.
    Made synchronous to comply with DRF's @api_view behavior.
    The Gemini network call is resolved using async_to_sync.
    """
    try:
        # 1. Parse JSON Request
        body = json.loads(request.body.decode('utf-8'))
        
        # 2. Extract Tenant
        tenant = getattr(request, 'tenant', None)
        
        # 3. Call The AI Pipeline (Sync wrapper around Async network call)
        generated_markdown = async_to_sync(generate_portfolio_asset)(body)
        
        # 4. Save to Database (Standard Sync)
        asset_id = create_portfolio_asset(tenant, body, generated_markdown)
        
        from rest_framework.response import Response
        return Response({
            "asset_id": str(asset_id),
            "generated_markdown": generated_markdown
        })
        
    except SovereignAIException as e:
        # A 500 error will be caught by EseriaJSONRenderer and formatted correctly.
        from rest_framework.response import Response
        return Response(str(e), status=500)
    except Exception as e:
        from rest_framework.response import Response
        return Response(f"Internal generation failure: {str(e)}", status=500)
