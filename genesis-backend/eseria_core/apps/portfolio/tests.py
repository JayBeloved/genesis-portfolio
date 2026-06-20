from django.test import TestCase, Client
from rest_framework.test import APIClient
from eseria_core.apps.core.models import Tenant, Domain

class Epic1LogicFortressTests(TestCase):
    def setUp(self):
        self.tenant = Tenant.objects.create(name="Genesis Test Tenant")
        self.domain = Domain.objects.create(domain_name="testserver", tenant=self.tenant)
        self.client = APIClient()

    def test_json_renderer(self):
        # Hit an invalid token endpoint to ensure 401/400 is wrapped by EseriaJSONRenderer
        response = self.client.post('/api/auth/token/', {'email': 'fake@example.com', 'password': 'wrong'})
        self.assertEqual(response.status_code, 401)
        
        json_data = response.json()
        self.assertIn('success', json_data)
        self.assertFalse(json_data['success'])
        self.assertIn('errors', json_data)
        self.assertIsNotNone(json_data['errors'])

    def test_cors_headers(self):
        response = self.client.options('/api/auth/token/', HTTP_ORIGIN='https://johnjaylawal.org', HTTP_ACCESS_CONTROL_REQUEST_METHOD='POST')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Access-Control-Allow-Origin'], 'https://johnjaylawal.org')

    from unittest.mock import patch

    @patch('eseria_core.apps.portfolio.views.generate_portfolio_asset')
    def test_generate_star_endpoint_unauthorized(self, mock_generate):
        response = self.client.post('/api/v1/content/generate-star/', {}, content_type='application/json')
        self.assertEqual(response.status_code, 401)
        json_data = response.json()
        self.assertFalse(json_data['success'])
