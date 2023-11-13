from django.contrib import admin
from .models import History


class HistoryAdmin(admin.ModelAdmin):
    list_display = ('image', 'result', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('image', 'result')
    ordering = ('-updated_at',)


admin.site.register(History, HistoryAdmin)
