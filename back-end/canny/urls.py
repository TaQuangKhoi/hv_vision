from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('history', views.HistoryViewSet)
# router.register('file-upload', views.FileUploadView, basename='file-upload')

urlpatterns = [
    path('api/', include(router.urls)),

    re_path('create_canny/', views.FileUploadView.as_view(), name='create_canny'),
]
