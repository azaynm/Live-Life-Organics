import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableUpdate from "./TableUpdate";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";

const API_BASE = "http://localhost:8080";

function ReservationForm() {
  const [formErrors, setFormErrors] = useState({});
  const location = useLocation();
  const { tableType } = location.state;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // Initialize to null
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [guestCount, setGuestCount] = useState(0); // Initialize to 0

  const [timeOptions] = useState([
    "8.00 AM - 9.00 AM",
    "9.00 AM - 10.00 AM",
    "10.00 AM - 11.00 AM",
    "11.00 AM - 12.00 PM",
    "12.00 PM - 1.00 PM",
    "1.00 PM - 2.00 PM",
    "2.00 PM - 3.00 PM",
    "3.00 PM - 4.00 PM",
    "4.00 PM - 5.00 PM",
  ]);

  const handleTimeChange = (e) => {
    const selected = e.target.value;
    setSelectedTime(selected);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
  };

  const handleGuestCountChange = (e) => {
    const newGuestCount = e.target.value;
    setGuestCount(newGuestCount);
  }

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!selectedDate) {
      errors.selectedDate = "Selected Date is required";
      formIsValid = false;
    }

    if (!selectedTime) {
      errors.selectedTime = "Selected Time is required";
      formIsValid = false;
    }

    if (!name.trim()) {
      errors.name = "Name is required";
      formIsValid = false;
    }

    if (!guestCount) {
      errors.guestCount = "Guest Count is required";
      formIsValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    }

    if (!number.trim()) {
      errors.number = "Number is required";
      formIsValid = false;
    }

    setFormErrors(errors);
    return formIsValid;
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const username = localStorage.getItem('username');


    try {
      // Display Swal confirmation dialog
      const result = await Swal.fire({
        title: 'Do you want to add this reservation?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Add',
        denyButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
       

        // Prepare data to send
        const data = {
          selectedDate,
          selectedTime,
          name,
          username,
          email,
          number,
          tableType,
          guestCount
        };

        // User confirmed, send POST request using Axios
        const response = await axios.post(`${API_BASE}/api/reservation/reservations`, data);
        // Handle success
        console.log("Reservation submitted successfully:", response.data);
        // Show success message
        Swal.fire('Reservation Request Added!', '', 'success');
        // Reset form fields
        setSelectedDate(null);
        setSelectedTime(null);
        setName("");
        setEmail("");
        setNumber("");
        setGuestCount(0); // Reset guest count to 0
      } else if (result.isDenied) {
        // User denied, show info message
        Swal.fire('Error Occurred', '', 'info');
      }
    } catch (error) {
      // Handle error
      console.error("Error submitting reservation:", error);
      // Show error message
      Swal.fire('Error Occurred', '', 'error');
    }
  };


  return (
    <div>
      <div className="card m-5">
        <div className="card-body">
          <div className="row m-3">
            <h2>Reservation Form - {tableType}</h2>
            <hr></hr>
          </div>
          <div className="row m-3 p-2">
            <div className="col-4 ">
              <span>Select Date</span>
              <div className="form-group">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  isClearable
                />
                <div className="text-danger">{formErrors.selectedDate}</div>
              </div>
            </div>
            <div className="col-4">
              <span>Select Time</span>
              <select
                className="form-select"
                value={selectedTime}
                onChange={handleTimeChange}
                aria-label="Default select example"
              >
                <option value={null}>Select Time</option> {/* Add default option */}
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div className="text-danger">{formErrors.selectedTime}</div>
            </div>
            <div className="col-4">
              <span>Select Guest Count</span>
              <select
                className="form-select"
                aria-label="Default select example"
                value={guestCount}
                onChange={handleGuestCountChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <div className="text-danger">{formErrors.guestCount}</div>
            </div>

          </div>
          <div className="row m-3 p-2">
            <hr></hr>
            <h5>Personal Details</h5>
            <div className="col-4 p-3">
              <span>Name</span>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
              <div className="text-danger">{formErrors.name}</div>
            </div>
            <div className="col-4 p-3">
              <span>Email</span>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your Email"
              />
              <div className="text-danger">{formErrors.email}</div>
            </div>
            <div className="col-4 p-3">
              <span>Phone Number</span>
              <input
                type="text"
                className="form-control"
                value={number}
                onChange={handleNumberChange}
                placeholder="Enter your Phone number"
              />
              <div className="text-danger">{formErrors.number}</div>
            </div>
          </div>
         
          <div className="row m-3 p-2 d-flex justify-content-end">
            <div className="col-2">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Reserve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
