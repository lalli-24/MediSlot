import { useState } from "react";
import api from "../services/api";

function Appointments() {
  const [patientName, setPatientName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  const getAppointments = async () => {
    if (!patientName) {
      setMessage("Please enter your name.");
      return;
    }

    try {
      const response = await api.get(
        `/appointments/?patient_name=${patientName}`
      );

      setAppointments(response.data);
      setMessage("");
    } catch (error) {
      setMessage("Unable to load appointments.");
    }
  };

  return (
    <div>
      <h2>My Appointments</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />

      <button onClick={getAppointments}>
        View Appointments
      </button>

      {message && <p>{message}</p>}

      {appointments.length === 0 && !message ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h3>{appointment.doctor_name}</h3>

            <p>
              Date: {appointment.appointment_date}
            </p>

            <p>
              Time: {appointment.appointment_time}
            </p>

            <p>
              Status: {appointment.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Appointments;