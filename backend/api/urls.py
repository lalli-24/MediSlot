from django.urls import path

from .views import (
    home,
    specialization_list,
    doctor_list,
    doctor_detail,
    doctor_availability,
    create_appointment,
    available_slots,
    appointment_list,
    cancel_appointment,
)


urlpatterns = [
    path("", home),
    path("specializations/", specialization_list),
    path("doctors/", doctor_list),
    path(
        "doctors/<int:doctor_id>/availability/",
        doctor_availability
    ),
    
    path(
    "doctors/<int:doctor_id>/available-slots/",
    available_slots
    ),
    path("appointments/", appointment_list),
    path("appointments/create/", create_appointment),
    path(
    "appointments/<int:appointment_id>/cancel/",
    cancel_appointment
),
    path(
    "doctors/<int:doctor_id>/",
    doctor_detail
),
]