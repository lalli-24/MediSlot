from django.urls import path

from .views import (
    home,
    specialization_list,
    doctor_list,
)


urlpatterns = [
    path("", home),
    path("specializations/", specialization_list),
    path("doctors/", doctor_list),
]