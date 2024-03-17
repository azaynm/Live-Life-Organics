import axios from 'axios';
import React, { useEffect } from 'react'
import FormData from 'form-data';

import { useState, } from "react";
import LoadingSpinner from '../components/LoadingSpinner';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const API_BASE = "http://localhost:8080";

const OrderApproval = () => {

  const [pendingOrderData, setPendingOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDeliveryAssign, setIsOpenDeliveryAssign] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');

  const fetchPendingOrderData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE}/api/order/orders`);
      const deliveries = response.data;

      setPendingOrderData(deliveries);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrderData(); 
  }, []); 

  
  
  const openDeliveryAssign = () => {
   
    setIsOpenDeliveryAssign(true);

  }

  return (
    <section className="vh-100">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          {pendingOrderData
            .sort((a, b) => a.time - b.time)
            .map((deliveryItem, index) => (
              <div className="card" style={{ width: '18rem' }} key={index}>

                <div className="card-body">
                  <h5 className="card-title">Order Details</h5>
                  <table className="table">
                    <tbody>
                      
                      <tr>
                        <td>PaymentId</td>
                        <td>{deliveryItem.paymentId}</td>
                      </tr>
                      <tr>
                        <td>Customer</td>
                        <td>{deliveryItem.customer}</td>
                      </tr>
                      <tr>
                        <td>Amount</td>
                        <td>{deliveryItem.amount}</td>
                      </tr>
                      <tr>
                        <td>
                            <td><button className='btn btn-primary' onClick={() => openDeliveryAssign()}>Confirm</button>
                            </td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      )}

      {isOpenDeliveryAssign && (
        <div className="form-overlay">
          <div className="form-container">
            <form className="d-flex flex-column justify-content-between">
              
              <div className="m-4 d-flex justify-content-around">
                <button className="btn btn-danger" type="button" onClick={() => setIsOpenDeliveryAssign(false)}>
                  Close
                </button>
                <button className="btn btn-primary" >Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>

  )
}

export default OrderApproval