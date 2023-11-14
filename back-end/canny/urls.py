from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('history', views.HistoryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),

    path('create/', views.FileUploadView.as_view(), name='create_canny'),

    path('test/', views.CannyView.as_view(), name='test'),
]
