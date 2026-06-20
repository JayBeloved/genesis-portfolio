import logging
from django.http import JsonResponse
from .models import Domain

logger = logging.getLogger(__name__)

class EseriaSovereignMiddleware:
    """
    The Gatekeeper. Intercepts all traffic and enforces Jurisdiction (Tenant) rules.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 1. Extract the requesting host (e.g., 'uncaved.johnjaylawal.org' or 'localhost')
        # We split by ':' to remove local development ports like ':8000' or ':3000'
        host = request.get_host().split(':')[0] 

        # Optional Sidonian Bypass: Allow global routes (like Admin or Auth) to pass 
        # without strict tenant enforcement, depending on your architectural preference.
        if request.path.startswith('/admin/'):
            return self.get_response(request)

        try:
            # 2. Identify the Jurisdiction
            # We use select_related to grab the Tenant data in the same database hit (Maximum Efficiency)
            domain = Domain.objects.select_related('tenant').get(domain_name=host)
            
            # 3. Attach the Tenant to the request globally
            # Every view from now on can just query: Post.objects.filter(tenant=request.tenant)
            request.tenant = domain.tenant

        except Domain.DoesNotExist:
            # If an unregistered domain tries to ping your API, the Gatekeeper rejects them.
            logger.warning(f"Unauthorized access attempt from unknown domain: {host}")
            
            # Formatted to perfectly match the EseriaJSONRenderer standard
            return JsonResponse(
                {
                    "success": False,
                    "message": "Jurisdiction not recognized. Access denied.",
                    "data": None,
                    "errors": {"domain": f"The host '{host}' is not a registered ESERIA territory."}
                }, 
                status=403
            )

        # Proceed to the actual view
        response = self.get_response(request)
        return response
