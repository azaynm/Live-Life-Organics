import React, { useState } from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import RegisterEmployee from './RegisterEmployee';
import EditEmployee from './EmployeeDetails';
import FeedbackMonitor from './FeedbackMonitor';
import DeliveryApproval from './DeliveryApproval';
import PendingReservations from './PendingReservations';
import SalaryManagement from './SalaryManagement';

const Admin = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab

    const tabDetails = [
        { id: 'tab1', name: 'Add Employees', url: '/register-employee' }, // Example tab without category
        { id: 'tab2', name: 'Edit Employees', url: '/edit-employee' }, // Change the URL for other tabs if needed
        { id: 'tab3', name: 'Salary Management', url: '/salary-management' },
        { id: 'tab4', name: 'Feedback Management', url: '/feedback-monitor' },
        { id: 'tab5', name: 'Delivery Approval', url: '/delivery-approval' },
        { id: 'tab6', name: 'Pending Reservations', url: '/pending-reservations' }
        
    ];

    //s
    const handleTabClick = (tab) => {
        setActiveTab(tab.id);
        
    };

    return (
        <div className=''>
            <div className='row'>
                {/* Sidebar */}
                <div className='col-2 bg-dark'>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        {tabDetails.map(tab => (
                            <button
                                key={tab.id}
                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab)} // Call handleTabClick function on click
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className='col-10'>
                    <div className="tab-content" id="v-pills-tabContent">
                        {/* Render RegisterEmployee component only if activeTab is 'tab1' */}
                        {activeTab === 'tab1' && <RegisterEmployee />}
                        {activeTab === 'tab2' && <EditEmployee />}
                        {activeTab === 'tab3' && <SalaryManagement />}
                        {activeTab === 'tab4' && <FeedbackMonitor />}
                        {activeTab === 'tab5' && <DeliveryApproval />}
                        {activeTab === 'tab6' && <PendingReservations />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
