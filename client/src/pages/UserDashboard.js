import React, { useState } from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import RegisterEmployee from './RegisterEmployee';
import EditEmployee from './EmployeeDetails';
import FeedbackMonitor from './FeedbackMonitor';
import PendingReservations from './PendingReservations';
import MyOrders from './MyOrders';
import PurchaseGiftCard from './GiftCard';
import Reservation from './Reservation';

const UserDashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab

    const tabDetails = [
        { id: 'tab1', name: 'My Orders', url: '/my-orders' }, // Example tab without category
        { id: 'tab2', name: 'Purchase Gift Cards', url: '/purchase-gift-cards' }, 
        { id: 'tab3', name: 'Reservations', url: '/reservations' }, 
        
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
                    <div className="nav flex-column nav-pills vh-100" id="v-pills-tab" role="tablist" aria-orientation="vertical">
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
                        {activeTab === 'tab1' && <MyOrders />}
                        {activeTab === 'tab2' && <PurchaseGiftCard />}
                        {activeTab === 'tab3' && <Reservation />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
