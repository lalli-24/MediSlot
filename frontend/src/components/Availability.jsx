import { useEffect, useState } from "react";
import api from "../services/api";

function Availability({ doctorId }) {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    api
      .get(`/doctors/${doctorId}/availability/`)
      .then((response) => {
        setAvailability(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching availability:",
          error
        );
      });
  }, [doctorId]);

  return (
    <div>
      {availability.length === 0 ? (
        <p>No availability found.</p>
      ) : (
        availability.map((slot) => (
          <div key={slot.id}>
            <strong>{slot.day}</strong>
            <p>
              {slot.start_time} - {slot.end_time}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Availability;