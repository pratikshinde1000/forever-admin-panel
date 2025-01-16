import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import Order from '../components/Order';

const Orders = ({ token }) => {

  const [orderList, setOrderList] = useState([]);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, { headers: { token } });
      console.log('response', response?.data);
      if (response?.data) {
        setOrderList(response?.data?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }



  return (
    <>
      <p className='mb-2'>All Orders</p>

      <div>
        {
          orderList.map((item, index) => {
            return <Order key={index} item={item} token={token} />
          })
        }
      </div>
    </>
  )
}

export default Orders
