import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Availability from "./Availability";
import BookingForm from "./BookingForm";

function DoctorProfile() {
  const { doctorId } = useParams();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    api
      .get(`/doctors/${doctorId}/`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor:", error);
      });
  }, [doctorId]);

  if (!doctor) {
    return <p>Loading doctor profile...</p>;
  }

  return (
    <div className="doctor-profile">
      <h1>{doctor.name}</h1>

      <p>
        <strong>Specialization:</strong>{" "}
        {doctor.specialization_name}
      </p>

      <p>
        <strong>Experience:</strong>{" "}
        {doctor.experience} years
      </p>

      <p>
        <strong>Consultation Fee:</strong>{" "}
        ₹{doctor.consultation_fee}
      </p>

      <h3>About the Doctor</h3>
      <p>{doctor.about}</p>

      <h3>Weekly Availability</h3>
      <Availability doctorId={doctor.id} />

      <BookingForm doctorId={doctor.id} />
    </div>
  );
}

export default DoctorProfile;