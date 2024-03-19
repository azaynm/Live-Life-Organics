import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableUpdate from "./TableUpdate";

function ReservationForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

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

  return (
    <div>
      <div class="card m-5">
        <div className="card-body">
          <div className="row m-3">
            <h2>Reservation Form</h2>
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
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <span>Select Guest Count</span>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
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
            </div>
          </div>

          <div className="row m-3 p-2">
          <hr></hr>
            <h5>Select Table</h5>
            <div className="col-4 p-3">
                    <TableUpdate/>
            </div>
        </div>
        <div className="row m-3 p-2 d-flex justify-content-end">
         <div className="col-2">
        <button type="button" class="btn btn-primary">primary</button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ReservationForm;
