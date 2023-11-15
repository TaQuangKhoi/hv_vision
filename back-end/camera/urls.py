from django.urls import path
from . import views

urlpatterns = [
    path('video/', views.video, name='normal video'),
    path('gray/', views.gray, name='gray video'),
    path('one_frame/', views.get_image, name='get_image'),
]