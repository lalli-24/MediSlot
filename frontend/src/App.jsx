import { useEffect, useState } from "react";
import {
  getDoctors,
  getSpecializations,
} from "./services/api";
import Appointments from "./components/Appointments";

import DoctorCard from "./components/DoctorCard";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState("");

  useEffect(() => {
    getDoctors()
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
      <Appointments />
    getSpecializations()
      .then((response) => {
        setSpecializations(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching specializations:",
          error
        );
      });
  }, []);

  const filteredDoctors = selectedSpecialization
    ? doctors.filter(
        (doctor) =>
          doctor.specialization ===
          Number(selectedSpecialization)
      )
    : doctors;

  return (
    <div>
      <h1>MediSlot</h1>

      <h2>Find a Doctor</h2>

      <select
        value={selectedSpecialization}
        onChange={(event) =>
          setSelectedSpecialization(event.target.value)
        }
      >
        <option value="">
          All Specializations
        </option>

        {specializations.map((specialization) => (
          <option
            key={specialization.id}
            value={specialization.id}
          >
            {specialization.name}
          </option>
        ))}
      </select>

      <h2>Doctors</h2>

      {filteredDoctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
          />
        ))
      )}
      <Appointments />
    </div>
  );
}

export default App;