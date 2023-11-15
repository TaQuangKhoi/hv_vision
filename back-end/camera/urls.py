from django.urls import path
from . import views

urlpatterns = [
    path('video/', views.video, name='normal video'),
    path('gray/', views.gray, name='gray video'),
    path('face_detect/', views.face_detect, name='face_detect'),
]