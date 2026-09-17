import { useState } from "react";
import api from "../services/api";

function BookingForm({ doctorId }) {
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getSlots = async () => {
    if (!date) {
      setMessage("Please select a date.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.get(
        `/doctors/${doctorId}/available-slots/?date=${date}`
      );

      setSlots(response.data.slots);
      setSelectedSlot("");

      if (response.data.slots.length === 0) {
        setMessage("No available slots for this date.");
      }
    } catch (error) {
      setMessage("Unable to load available slots.");
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    if (!patientName || !date || !selectedSlot) {
      setMessage("Please fill all details and select a time slot.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await api.post("/appointments/create/", {
        doctor: doctorId,
        patient_name: patientName,
        appointment_date: date,
        appointment_time: `${selectedSlot}:00`,
      });

      setSelectedSlot("");

      const response = await api.get(
        `/doctors/${doctorId}/available-slots/?date=${date}`
      );

      setSlots(response.data.slots);
      setMessage("Appointment booked successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "Unable to book appointment."
      );
    } finally {
      setLoading(false);
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
        onChange={(e) => {
          setDate(e.target.value);
          setSlots([]);
          setSelectedSlot("");
          setMessage("");
        }}
      />

      <button
        onClick={getSlots}
        disabled={loading}
      >
        {loading ? "Loading..." : "Check Available Slots"}
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

      <button
        onClick={bookAppointment}
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default BookingForm;