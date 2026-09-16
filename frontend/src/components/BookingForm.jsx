import { useState } from "react";
import api from "../services/api";

function BookingForm({ doctorId }) {
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  const getSlots = async () => {
    if (!date) {
      setMessage("Please select a date.");
      return;
    }

    try {
      const response = await api.get(
        `/doctors/${doctorId}/available-slots/?date=${date}`
      );

      setSlots(response.data.slots);
      setSelectedSlot("");
      setMessage("");
    } catch (error) {
      setMessage("Unable to load available slots.");
    }
  };

  const bookAppointment = async () => {
    if (!patientName || !date || !selectedSlot) {
      setMessage("Please fill all details.");
      return;
    }

    try {
      await api.post("/appointments/create/", {
        doctor: doctorId,
        patient_name: patientName,
        appointment_date: date,
        appointment_time: `${selectedSlot}:00`,
      });

      setMessage("Appointment booked successfully!");
      setSelectedSlot("");
      getSlots();
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
        "Unable to book appointment."
      );
    }
  };

  return (
    <div className="booking-form">
      <h3>Book Appointment</h3>

      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={getSlots}>
        Check Available Slots
      </button>

      {slots.length > 0 && (
        <div>
          <h4>Available Slots</h4>

          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      )}

      {selectedSlot && (
        <p>
          Selected Time: <strong>{selectedSlot}</strong>
        </p>
      )}

      <button onClick={bookAppointment}>
        Book Appointment
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default BookingForm;