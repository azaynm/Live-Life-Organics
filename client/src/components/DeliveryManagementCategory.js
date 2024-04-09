import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './DeliveryManagementCategory.css';
import FormData from 'form-data';
import LoadingSpinner from './LoadingSpinner';

const DeliveryManagementCategory = ({ category }) => {

    const API_BASE = "http://localhost:8080";
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenDeliveryAssign, setIsOpenDeliveryAssign] = useState(false);
    const [isOpenCheffAssign, setIsOpenCheffAssign] = useState(false);

    const [deliveryStaff, setDeliveryStaff] = useState([]);
    const [isLoadingDeliveryStaff, setIsLoadingDeliveryStaff] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState("");

    const [selectedOrder, setSelectedOrder] = useState("");

    const [cheff, setCheff] = useState([]);
    const [isLoadingCheff, setIsLoadingCheff] = useState(false);
    const [selectedCheff, setSelectedCheff] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDeliveryStaff = async () => {
        try {
            setIsLoadingDeliveryStaff(true);
            const response = await axios.get(`${API_BASE}/api/delivery-staff/delivery-staff`);
            setDeliveryStaff(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoadingDeliveryStaff(false);
        }
    }

    const fetchCheff = async () => {
        try {
            setIsLoadingCheff(true);
            const response = await axios.get(`${API_BASE}/api/cheff/cheff`);
            setCheff(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoadingCheff(false);
        }
    }

    const fetchReadyItems = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/api/order/${category}`);
            setItems(response.data);
            console.log(response.data)
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReadyItems(); // Initial fetch
        fetchDeliveryStaff();
        fetchCheff();
    }, []); // Fetch campaigns initially

    const openDeliveryAssign = (id) => {
        setSelectedOrder(id)
        console.log("Selected Order id: ", id)
        setIsOpenDeliveryAssign(true);

    }

    const openCheffAssign = (id) => {
        setSelectedOrder(id)
        console.log("Selected Order id: ", id)
        setIsOpenCheffAssign(true);
    }

    const makeReady = async (e) => {
        console.log("Selected Order id: ", selectedOrder)
        console.log("Selected Cheff id: ", selectedCheff)

        try {
            const response = await axios.put(`${API_BASE}/api/order/update-status/${selectedOrder}`, { status: "ready-to-deliver", selectedCheff });
            fetchReadyItems();
            console.log(response.data);
        } catch (error) {
            console.error("Error updating order status:", error);
            throw error;
        }
    };



    const assignOrder = async (e) => {
        console.log("assign order")
        const orderId = selectedOrder;
        const staffId = selectedStaff;
        try {
            const response = await axios.put(`${API_BASE}/api/order/assign-delivery`, { orderId, staffId }); // Fixed selectedStaff to staffId
            console.log('Delivery staff updated successfully:', response.data);
            fetchReadyItems();
            setIsOpenDeliveryAssign(false);
        } catch (error) {
            console.error('Error updating delivery staff:', error.response.data);
        }

    };



    const handleChange = ({ target }) => {
        console.log("sd", target.value)
        setSelectedStaff(target.value)
    }

    const handleChangeCheff = ({ target }) => {
        console.log("sd", target.value)
        setSelectedCheff(target.value)
    }

    const filteredPendingOrders = items.filter(pendingOrder =>
        pendingOrder.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pendingOrder.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pendingOrder._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (category === "ready-to-deliver" && pendingOrder.cheff.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (category === "delivering" && (pendingOrder.cheff.toLowerCase().includes(searchQuery.toLowerCase()) || pendingOrder.deliveryStaff.toLowerCase().includes(searchQuery.toLowerCase())) ) ||
        (category === "finished" && (pendingOrder.cheff.toLowerCase().includes(searchQuery.toLowerCase()) || pendingOrder.deliveryStaff.toLowerCase().includes(searchQuery.toLowerCase())) )
    );



    return (
        <div className="scrollable-container py-3">
            <div className="mb-3">
                <input
                    className='form-control'
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    filteredPendingOrders.map((item, index) => (
                        <div className="card" style={{}} key={index}>
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
                                    <div className="col-md">
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
                                                    <td>Order Id</td>
                                                    <td className='d-flex justify-content-end'>{item._id}</td>
                                                </tr>

                                                <tr>
                                                    <td>PaymentId</td>
                                                    <td className='d-flex justify-content-end'>{item.paymentId}</td>
                                                </tr>

                                                {category === "ready-to-deliver" && (
                                                    <tr>
                                                        <td>Cheff</td>
                                                        <td className='d-flex justify-content-end'>{item.cheff}</td>
                                                    </tr>
                                                )}

                                                {category === "delivering" && (
                                                    <>
                                                        <tr>
                                                            <td>Cheff</td>
                                                            <td className='d-flex justify-content-end'>{item.cheff}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>Deliver Staff</td>
                                                            <td className='d-flex justify-content-end'>{item.deliveryStaff}</td>
                                                        </tr>
                                                    </>
                                                )}

                                                {category === "finished" && (
                                                    <>
                                                        <tr>
                                                            <td>Cheff</td>
                                                            <td className='d-flex justify-content-end'>{item.cheff}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>Deliver Staff</td>
                                                            <td className='d-flex justify-content-end'>{item.deliveryStaff}</td>
                                                        </tr>
                                                    </>
                                                )}


                                                <tr>
                                                    <td style={{ width: '100%' }}>
                                                        {category === "pending" && (
                                                            <button className='btn btn-primary' onClick={() => openCheffAssign(item._id)} style={{ width: '100%' }}>Assign Cheff</button>
                                                        )}
                                                        {category === "ready-to-deliver" && (
                                                            <button className='btn btn-primary' onClick={() => openDeliveryAssign(item._id)} style={{ width: '100%' }}>Assign Deliver Staff</button>
                                                        )}
                                                        {category === "delivering" && (
                                                            <button className='btn btn-primary' style={{ width: '100%' }}>Finish</button>
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
                                    <button className="btn btn-primary" onClick={() => assignOrder()}>Assign Order</button>
                                </div>
                                <div className="m-4">

                                    <div className="form-group">
                                        <select
                                            className="form-select"
                                            name="selectedStaff"
                                            value={selectedStaff}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Delivery Staff:</option>
                                            {deliveryStaff.map((staff, index) => (
                                                <option key={index} value={staff.id}>{staff.name}</option>
                                            ))}
                                        </select>

                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isOpenCheffAssign && (
                    <div className="form-overlay">
                        <div className="form-container">
                            <form className="d-flex flex-column justify-content-between">
                                <div className="m-4 d-flex justify-content-around">
                                    <button className="btn btn-danger" type="button" onClick={() => setIsOpenCheffAssign(false)}>
                                        Close
                                    </button>
                                    <button className="btn btn-primary" onClick={() => makeReady()}>Assign Cheff</button>
                                </div>
                                <div className="m-4">

                                    <div className="form-group">
                                        <select
                                            className="form-select"
                                            name="selectedCheff"
                                            value={selectedCheff}
                                            onChange={handleChangeCheff}
                                        >
                                            <option value="">Select Cheff:</option>
                                            {cheff.map((staff, index) => (
                                                <option key={index} value={staff.id}>{staff.name}</option>
                                            ))}
                                        </select>

                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
        </div>

    );
}

export default DeliveryManagementCategory