from django.urls import path
from . import views

urlpatterns = [
    path('gray/', views.gray, name='gray video'),
    path('one_frame/', views.get_image, name='get_image'),
]