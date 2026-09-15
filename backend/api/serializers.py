from rest_framework import serializers
from .models import Specialization, Doctor, DoctorAvailability


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = "__all__"


class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAvailability
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):
    specialization_name = serializers.CharField(
        source="specialization.name",
        read_only=True
    )

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "specialization",
            "specialization_name",
            "experience",
            "consultation_fee",
            "about",
            "image",
        ]