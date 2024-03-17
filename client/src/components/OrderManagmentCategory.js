import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './OrderManagementCategory.css';
import FormData from 'form-data';
import LoadingSpinner from './LoadingSpinner';

const OrderManagementCategory = ({ category }) => {

    const API_BASE = "http://localhost:8080";
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenDeliveryAssign, setIsOpenDeliveryAssign] = useState(false);

    const fetchReadyItems = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/api/order/${category}`);
            setItems(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReadyItems(); // Initial fetch
    }, []); // Fetch campaigns initially

    const openDeliveryAssign = () => {

        setIsOpenDeliveryAssign(true);

    }

    const makeReady = async (id) => {
        await Swal.fire({
            title: 'Is the order ready to deliver?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Ready',
            denyButtonText: `Not Ready`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Ready!', '', 'success');
                try {
                    const response = await axios.put(`http://localhost:8080/api/order/update-status/${id}`, { status: "ready-to-deliver" });
                    fetchReadyItems();
                    return response.data;
                } catch (error) {
                    console.error("Error updating order status:", error);
                    throw error; // Re-throw the error for handling by the caller
                }
            } else if (result.isDenied) {
                Swal.fire('Item is not removed', '', 'info');
            }
        });
    };


    return (
        <div className="scrollable-container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    items.map((item, index) => (
                        <div className="card" style={{ }} key={index}>
    <div className="card-body">
        <h5 className="card-title">Order Details</h5>
        <div className="col">
            <div className="col-md-6">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Ordered Items</td>
                        </tr>
                        {item.foods.map((food, index) => (
                            <tr key={index} style={{ height: '100%', overflowY: 'auto' }}>
                            <td>
                                <div className='d-flex flex-row'>
                                    <div style={{ width: '40px' }}>
                                        <img src={food.imageUrl} width={40} />
                                    </div>
                                    <div style={{ width: '100px' }}>{food.name}</div>
                                    <div className="d-flex justify-content-end" style={{ width: '50px' }}>{food.quantity}</div>
                                    <div className="d-flex justify-content-end" style={{ width: '50px' }}>{food.price}</div>
                                    <div className="d-flex justify-content-end" style={{ width: '80px' }}>Rs.{food.subTotal}</div>
                                </div>
                            </td>
                        </tr>
                        
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-md-6">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Amount</td>
                            <td className='d-flex justify-content-end'><b>Rs.{item.amount}</b></td>
                        </tr>
                        
                        <tr>
                            <td>Customer</td>
                            <td className='d-flex justify-content-end'>{item.customer}</td>
                        </tr>

                        <tr>
                            <td>PaymentId</td>
                            <td className='d-flex justify-content-end'>{item.paymentId}</td>
                        </tr>
                        <tr>
                            <td>
                                {category === "pending" && (
                                    <button className='btn btn-primary' onClick={() => makeReady(item._id)}>Ready</button>
                                )}
                                {category === "ready-to-deliver" && (
                                    <button className='btn btn-primary' onClick={() => openDeliveryAssign()}>Assign</button>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

                    ))
                )}

                {isOpenDeliveryAssign && (
                    <div className="form-overlay">
                        <div className="form-container">
                            <form className="d-flex flex-column justify-content-between">
                                <div className="m-4 d-flex justify-content-around">
                                    <button className="btn btn-danger" type="button" onClick={() => setIsOpenDeliveryAssign(false)}>
                                        Close
                                    </button>
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

export default OrderManagementCategory