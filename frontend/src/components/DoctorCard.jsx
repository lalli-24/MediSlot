import Availability from "./Availability";
import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>

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

      <p>{doctor.about}</p>

      <Availability doctorId={doctor.id} />

      <Link to={`/doctor/${doctor.id}`}>
        <button>View Profile</button>
      </Link>
    </div>
  );
}

export default DoctorCard;