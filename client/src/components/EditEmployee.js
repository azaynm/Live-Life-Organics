import axios from 'axios';
import React, { useState } from 'react';

const API_BASE = "http://localhost:8080";
const EditEmployee = ({ emp, fetchEmployeeData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState(emp);
    const [originalEmployee, setOriginalEmployee] = useState(emp);
    const allRoles = ["systemAdmin", "employee", "eventCoordinator", "deliveryStaff", "cateringManager", "financialManager", "cheff"];
    const [additionalRoles, setAdditionalRoles] = useState([]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "role") {
            const updatedRoles = e.target.checked
                ? [...editedEmployee.roles, value]
                : editedEmployee.roles.filter(role => role !== value);
            setEditedEmployee({ ...editedEmployee, roles: updatedRoles });
        } else {
            setEditedEmployee({ ...editedEmployee, [name]: value });
        }
    };

    const saveChanges = async () => {
        try {
            // Send a PUT request to the server with the updated employee data
            const response = await axios.put(`${API_BASE}/api/employee/employees/${emp._id}`, editedEmployee);
            fetchEmployeeData();
            // Return the updated employee data from the response
            const updatedEmployeeData = response.data;
            setOriginalEmployee(updatedEmployeeData); // Update originalEmployee with the updated data
            setIsEditing(false); // Keep editing mode disabled after saving changes
        } catch (error) {
            // Handle errors
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Server error:', error.response.data);
                throw new Error('Server error');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from server');
                throw new Error('No response received from server');
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up request:', error.message);
                throw new Error('Error setting up request');
            }
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        // Reset editedEmployee back to originalEmployee
        setEditedEmployee(originalEmployee);
    };

    return (
        <div className="employee-details">
            {isEditing ? (
                <div className="edit-form">
                    <div className="mb-3">
                        <label htmlFor="empName" className="form-label">Employee Name</label>
                        <input type="text" className="form-control" id="empName" name="empName" value={editedEmployee.empName} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Position</label>
                        <input type="text" className="form-control" id="position" name="position" value={editedEmployee.position} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={editedEmployee.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Roles</label>
                        <div>
                            {allRoles.map((role, index) => (
                                <div className="form-check" key={index}>
                                    <input className="form-check-input" type="checkbox" id={`role${index}`} name="role" value={role} checked={editedEmployee.roles.includes(role)} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor={`role${index}`}>
                                        {role}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Add inputs for other editable fields */}
                    <div className="btn-group">
                        <button onClick={saveChanges} className="btn btn-primary">Save</button>
                        <button onClick={cancelEdit} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="employee-info">
                    <div><strong>Employee Name:</strong> {emp.empName}</div>
                    <div><strong>Position:</strong> {emp.position}</div>
                    <div><strong>Email:</strong> {emp.email}</div>
                    <div><strong>Roles:</strong> {emp.roles.map(role => `'${role}'`).join(', ')}</div>
                    {/* Display other employee details */}
                    <button onClick={handleEdit} className="btn btn-secondary">Edit</button>
                </div>
            )}
        </div>
    );
};

export default EditEmployee;
