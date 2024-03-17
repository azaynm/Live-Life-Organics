import axios from 'axios';
import React, { useEffect } from 'react'
import FormData from 'form-data';
import { useState, } from "react";
import LoadingSpinner from '../components/LoadingSpinner';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import MenuCategory from '../components/MenuCategory';
import OrderManagementCategory from '../components/OrderManagmentCategory';
import './OrderApproval.css'

const API_BASE = "http://localhost:8080";

const OrderApproval = () => {

    const [pendingOrderData, setPendingOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState('');
    const [activeTab, setActiveTab] = useState('tab1');

    const tabDetails = [
        { id: 'tab1', name: 'Pending', category: 'pending' },
        { id: 'tab2', name: 'Ready to Deliver', category: 'ready-to-deliver' }
    ];

 

    return (
   
            <div className="form-container" style={{width:'100%'}}>
                
                <div className="tabs">
                    {tabDetails.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab btn btn-primary mx-2 ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className="tab-content">
                    {tabDetails.map(tab => (
                        <div key={tab.id}>
                            {activeTab === tab.id && (
                                <OrderManagementCategory category={tab.category} />
                            )}
                        </div>
                    ))}
                </div>


            </div>
            

            )
}

            export default OrderApproval