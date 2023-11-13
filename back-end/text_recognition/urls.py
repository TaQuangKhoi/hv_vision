from django.urls import path

from . import views

urlpatterns = [
    path('', views.canny, name="get_image_canny_hv"),
    path('contours/', views.contours, name="get_image_contours_hv"),
]