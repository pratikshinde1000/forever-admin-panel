import React, {useState} from 'react';
import { currency, backendUrl } from '../App';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';


const Order = ({ item, token }) => {

    const [orderStatus, setOrderStatus] = useState(item.status);

    const totalQuntity = item.cartData.reduce((acc, curr) => {
        acc += Number(curr.quantity);
        return acc;
    }, 0)

    const sizes = item.cartData.map((item) => {
        return item.size;
    }).toString();


    const handleStatusChange = async (event, order_no) => {
        try {
            const value = event.target.value;
            const response = await axios.post(`${backendUrl}/api/order/update/status`, { order_no: order_no, status: value }, { headers: { token } })
            console.log('response', response?.data);
            if(response?.data?.success){
                setOrderStatus(value);
            }
        } catch (error) {
            console.log('error', error);
            toast.error(error?.response?.data?.error || 'Unable to Update Status')
        }
    }


    return <div className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-start md:justify-between gap-2'>
        <div className='flex items-start gap-6 text-sm'>
            <div className='flex flex-col w-40'>
                <img src={assets.order_icon} className='w-16 sm:w-20' alt="" />
                <p className='sm:text-base font-medium'>{item?.order_no}</p>
            </div>
            <div>
                <div className='flex gap-1 flex-col text-base text-gray-700'>
                    <p>Total: {currency}{item?.cartAmount}</p>
                    <p>Quantity: {totalQuntity}</p>
                    <p>Size: {sizes}</p>
                    <p>Payment Mode: <span className='text-gray-400'>{item?.paymentMode}</span>  </p>
                    <p>Payment Status: <span className='text-gray-400'>{item?.paymentStatus}</span>  </p>
                    <p>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span> </p>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-between md:w-11/12 '>

            <div className='flex flex-col w-48'>
                {
                    item?.cartData?.map((element, index) => {
                        const totalPrice = Number(element?.quantity) * Number(element.products.price);
                        if (index === item?.cartData?.lenth - 1) {
                            return <p key={index}> {`${++index}) Name: ${element?.products?.name} (Size: ${element?.size}) Price: ${element?.quantity} * ${element?.products?.price} = ${totalPrice}`} </p>
                        } else {
                            return <p key={index}>{`${++index}) Name: ${element?.products?.name} (Size: ${element?.size})  Price: ${element?.quantity} * ${element?.products?.price} = ${totalPrice}`} </p>
                        }
                    }
                    )
                }
            </div>

            <div className='flex flex-col w-56'>
                <p>Name: {item?.address?.first_name} {item?.address?.last_name}</p>
                <p>Email: {item?.address?.email}</p>
                <p>Contact: {item?.address?.contact}</p>
                <p>Address: {item?.address?.street}, {item?.address?.city}, {item?.address?.state}, {item?.address?.country}, {item?.address?.pincode}. </p>
            </div>

            <div className='flex items-center gap-2'>
                <select value={orderStatus} onChange={(event) => handleStatusChange(event, item?.order_no)} className='px-2 py-1 rounded-md' name="Order Status" id="">
                    <option value="ORDER_ACCEPTED">ORDER ACCEPTED</option>
                    <option value="ORDER_PLACED">ORDER PLACED</option>
                    <option value="ORDER_DISPATCHED"> ORDER DISPATCHED</option>
                    <option value="ORDER_DELIVERED">ORDER DELIVERED</option>
                    <option value="ORDER_CANCELLED"> ORDER CANCELLED</option>
                </select>
            </div>
        </div>
    </div>
}

export default Order
