import React from 'react'
import { useState, useEffect } from 'react';
import '../index.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FormData from 'form-data';
import Swal from 'sweetalert2';


const Cart = () => {

  const [cartFoodData, setCartFoodData] = useState([]);
  const [cartFoodLoading, setCartFoodLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState("");
  const navigate = useNavigate();

    const handleCheckout = () => {
      navigate('/payment', { state: { total, cartFoodData } });
    };
   
  const fetchCartFoodData = async () => {
    setCartFoodLoading(true);
    try {
      const { data: response } = await axios.get(`http://localhost:8080/api/cart/user/${localStorage.getItem('username')}`);
      setCartFoodData(response);
      console.log(response);

      const totalSubTotal = response.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.subTotal;
    }, 0);
    setTotal(totalSubTotal); 
    console.log(cartFoodData)

    } catch (error) {
      console.error(error.message);
    }
    setCartFoodLoading(false);
  }

  useEffect(() => {
    fetchCartFoodData();
  }, []);

  const deleteItem = async (id) => {
    await Swal.fire({
      title: 'Do you want to remove this from?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Removed Item!', '', 'success')
        try {
          await fetch(`http://localhost:8080/api/cart/delete/${id}`, { method: "DELETE" });
          // Update cartFoodData after successful deletion
          setCartFoodData(cartFoodData.filter(cartFoodItem => cartFoodItem._id !== id));
          
        } catch (error) {
          console.error('Error deleting item:', error);
          Swal.fire('Error!', 'Failed to remove item from cart.', 'error');
        }
      } else if (result.isDenied) {
        Swal.fire('Item is not removed', '', 'info')
      }
    });
  }

  useEffect(() => {
    // Recalculate total after cartFoodData has been updated
    const newTotal = cartFoodData.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.subTotal;
    }, 0);
    setTotal(newTotal);
  }, [cartFoodData]);
  


  


  return (
    <div className='row'>
      {cartFoodLoading && <div>Loading</div>}
      {!cartFoodLoading && (
        <div className="container col-sm-8">
          {cartFoodData.map(item => (

            <div className="row container-fluid d-flex align-items-center justify-content-center m-2">

              <div className='row d-flex flex-row'>
                <img className='img-circle ' src={item.imageUrl} alt="..." style={{ width: '150px', height: '100px' }} />
                <div className='col d-flex align-items-center'>{item.name}</div>
                <div className='col d-flex align-items-center'>Rs. {item.price}</div>
                <div className='col d-flex align-items-center'>{item.quantity}</div>
                <div className='col d-flex align-items-center'>Rs. {item.subTotal}</div>
                <div className='col d-flex align-items-center align-items-end'>
                  <Button variant="contained"  style={{ margin: '10px', width: '150px' }}>Edit</Button>
                  <Button variant="contained" onClick={
                    async () => {
                      await deleteItem(item._id);

                    }
                  } style={{ margin: '10px', width: '150px' }}>Remove Item</Button>
                </div>


              </div>
            </div>
          ))}

          
        </div>

      )}
      <div className='row' style={{ position: 'fixed', marginBottom: '200px', marginRight: '200px', marginLeft: '200px', top: '400px' }}>
        
        <div className='col-sm'>
        <Button variant="contained" style={{ margin: '10px', width: '150px' }} onClick={handleCheckout}>
            Checkout Rs.{total}
        </Button>
        </div>
        <div>
        </div>
      </div>

    </div>
  )
}

export default Cart