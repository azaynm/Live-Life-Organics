import React, { useState } from 'react';

const EditEmployee = ({ emp }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState(emp);
    const [originalEmployee, setOriginalEmployee] = useState(emp);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    const saveChanges = () => {
        // Save changes to the employee
        setIsEditing(false);
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
                    {/* Add inputs for other editable fields */}
                    <button onClick={saveChanges} className="btn btn-primary me-2">Save</button>
                    <button onClick={cancelEdit} className="btn btn-secondary">Cancel</button>
                </div>
            ) : (
                <div className="employee-info">
                    <div><strong>Employee Name:</strong> {emp.empName}</div>
                    <div><strong>Position:</strong> {emp.position}</div>
                    <div><strong>Email:</strong> {emp.email}</div>
                    {/* Display other employee details */}
                    <button onClick={handleEdit} className="btn btn-secondary">Edit</button>
                </div>
            )}
        </div>
    );
};

export default EditEmployee;
