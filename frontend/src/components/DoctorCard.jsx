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

      <button>View Profile</button>
    </div>
  );
}

export default DoctorCard;