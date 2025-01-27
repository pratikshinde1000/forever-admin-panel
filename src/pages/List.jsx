import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {

  const [list, setList] = useState([]);

  const removeProduct = async (productId) => {
    try {
      console.log('productId', productId);

      const response = await axios.post(`${backendUrl}/api/product/remove`, { productId }, { headers: { token } });

      if (response?.data?.success) {
        toast.success('Product Removed!');
        fetchProducts();
      } else {
        toast.error('failed to remove product')
      }

    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.error || 'failed to remove product')
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/get`);
      console.log('response', response?.data);
      setList(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Internal Server Error');
    }
  }

  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        <div>
          {list.map((item, index) => {
            return <div key={index} className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
              <img src={item.image[0]} alt="" />
              <p>{item?.name}</p>
              <p>{item?.category}</p>
              <p>{currency}{item?.price}</p>
              <p onClick={() => removeProduct(item?._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default List
