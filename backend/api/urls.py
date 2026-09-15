from django.urls import path

from .views import (
    home,
    specialization_list,
    doctor_list,
    doctor_availability,
)


urlpatterns = [
    path("", home),
    path("specializations/", specialization_list),
    path("doctors/", doctor_list),
    path(
        "doctors/<int:doctor_id>/availability/",
        doctor_availability
    ),
]