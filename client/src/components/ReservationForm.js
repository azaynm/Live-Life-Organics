import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ReservationForm() {
    const [selectedDate, setSelectedDate] = useState(null);

    // Function to handle date selection
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    return (
        <div>
            <div className="card m-5">
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <select className="form-select" aria-label="Default select example" onChange={handleDateChange}>
                                <option selected>Select Date</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                         
                        </div>
                        <div className="col-6">Asdsdwdwdd</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationForm;
