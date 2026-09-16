from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Specialization,
    Doctor,
    DoctorAvailability,
    Appointment,
)
from .serializers import (
    SpecializationSerializer,
    DoctorAvailabilitySerializer,
    DoctorSerializer,
    AppointmentSerializer,
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

@api_view(["POST"])
def create_appointment(request):
    serializer = AppointmentSerializer(data=request.data)

    if serializer.is_valid():
        doctor = serializer.validated_data["doctor"]
        appointment_date = serializer.validated_data[
            "appointment_date"
        ]
        appointment_time = serializer.validated_data[
            "appointment_time"
        ]

        already_booked = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status__in=["Pending", "Confirmed"],
        ).exists()

        if already_booked:
            return Response(
                {
                    "error": "This appointment slot is already booked."
                },
                status=400,
            )

        appointment = serializer.save()

        return Response(
            AppointmentSerializer(appointment).data,
            status=201,
        )

    return Response(serializer.errors, status=400)