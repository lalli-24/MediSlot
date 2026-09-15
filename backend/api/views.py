from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Specialization, Doctor, DoctorAvailability
from .serializers import (
    SpecializationSerializer,
    DoctorAvailabilitySerializer,
    DoctorSerializer,
)


@api_view(["GET"])
def home(request):
    return Response({
        "message": "Welcome to MediSlot API"
    })


@api_view(["GET"])
def specialization_list(request):
    specializations = Specialization.objects.all()
    serializer = SpecializationSerializer(
        specializations,
        many=True
    )
    return Response(serializer.data)


@api_view(["GET"])
def doctor_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(
        doctors,
        many=True
    )
    return Response(serializer.data)

@api_view(["GET"])
def doctor_availability(request, doctor_id):
    availability = DoctorAvailability.objects.filter(
        doctor_id=doctor_id
    ).order_by("day", "start_time")

    serializer = DoctorAvailabilitySerializer(
        availability,
        many=True
    )

    return Response(serializer.data)