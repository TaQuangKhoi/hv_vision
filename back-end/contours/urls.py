from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.FileUploadView.as_view(), name='create_canny'),
]