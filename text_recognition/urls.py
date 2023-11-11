from django.urls import path

from . import views

urlpatterns = [
    path("", views.index_convert_color, name="index_convert_color"),
]