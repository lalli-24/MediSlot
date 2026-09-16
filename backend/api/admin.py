from django.contrib import admin
from .models import (
    Specialization,
    Doctor,
    DoctorAvailability,
    Appointment,
)

admin.site.register(Specialization)
admin.site.register(Doctor)
admin.site.register(DoctorAvailability)
admin.site.register(Appointment)