from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta

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

@api_view(["GET"])
def available_slots(request, doctor_id):
    date = request.query_params.get("date")

    if not date:
        return Response(
            {"error": "Date is required."},
            status=400
        )

    try:
        selected_date = datetime.strptime(
            date,
            "%Y-%m-%d"
        ).date()
    except ValueError:
        return Response(
            {"error": "Invalid date format. Use YYYY-MM-DD."},
            status=400
        )

    day_name = selected_date.strftime("%A")

    availability = DoctorAvailability.objects.filter(
        doctor_id=doctor_id,
        day=day_name
    ).first()

    if not availability:
        return Response({
            "date": date,
            "day": day_name,
            "slots": []
        })

    booked_times = Appointment.objects.filter(
        doctor_id=doctor_id,
        appointment_date=selected_date,
        status__in=["Pending", "Confirmed"]
    ).values_list(
        "appointment_time",
        flat=True
    )

    booked_times = set(booked_times)

    slots = []

    current_time = datetime.combine(
        selected_date,
        availability.start_time
    )

    end_time = datetime.combine(
        selected_date,
        availability.end_time
    )

    while current_time < end_time:
        slot_time = current_time.time()

        if slot_time not in booked_times:
            slots.append(slot_time.strftime("%H:%M"))

        current_time += timedelta(
            minutes=availability.slot_duration
        )

    return Response({
        "date": date,
        "day": day_name,
        "slots": slots
    })

@api_view(["GET"])
def appointment_list(request):
    patient_name = request.query_params.get("patient_name")

    if not patient_name:
        return Response(
            {"error": "Patient name is required."},
            status=400
        )

    appointments = Appointment.objects.filter(
        patient_name=patient_name
    ).order_by(
        "appointment_date",
        "appointment_time"
    )

    serializer = AppointmentSerializer(
        appointments,
        many=True
    )

    return Response(serializer.data)