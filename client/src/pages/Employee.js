import React from 'react';

export const Employee = () => {
  return (
    <div>
      <h1>Employee Information</h1>
      <div className="employee-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows of employee data here */}
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Software Engineer</td>
              <td>Engineering</td>
              <td>$100,000</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
        <div className="buttons-container">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </div>
    </div>
  );
};

