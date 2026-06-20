from rest_framework.renderers import JSONRenderer


class EseriaJSONRenderer(JSONRenderer):
    """
    Forces all DRF responses into a standardized ESERIA payload.
    { "success": bool, "message": str, "data": dict/list, "errors": dict/list }
    """

    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code

        response_data = {
            "success": True,
            "message": "Operation successful.",
            "data": data,
            "errors": None
        }

        # Catch HTTP Errors and format them
        if status_code >= 400:
            response_data["success"] = False
            response_data["message"] = "Operation failed."
            response_data["data"] = None
            response_data["errors"] = data

        return super().render(response_data, accepted_media_type, renderer_context)