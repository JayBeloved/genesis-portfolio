from django.contrib import admin
from .models import Tenant, Domain, SovereignUser, TenantMembership

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at')
    search_fields = ('name',)

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ('domain_name', 'tenant', 'is_primary')
    search_fields = ('domain_name',)
    list_filter = ('tenant',)

@admin.register(SovereignUser)
class SovereignUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'is_staff')
    search_fields = ('email',)

@admin.register(TenantMembership)
class TenantMembershipAdmin(admin.ModelAdmin):
    list_display = ('user', 'tenant', 'role')
    list_filter = ('tenant', 'role')
