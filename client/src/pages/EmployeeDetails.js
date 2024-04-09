import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditEmployee from '../components/EditEmployee';

const API_BASE = "http://localhost:8080";

const EmployeeDetails = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEmployeeData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/api/employee/view-employees`);
            const employees = response.data;
            setEmployeeData(employees);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom d-flex justify-content-center align-items-center">
                {employeeData.map((emp) => (
                    <EditEmployee key={emp._id} emp={emp} fetchEmployeeData={fetchEmployeeData}/>
                ))}
            </div>
        </section>
    );
};

export default EmployeeDetails;
