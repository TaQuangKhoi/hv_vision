from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index_hv_text_recognition")
]