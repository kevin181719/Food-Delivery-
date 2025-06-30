import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (err) {
      toast.error('Network error');
      console.error(err);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status",{orderId,status:event.target.value})
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-items">
            <img src={assets.parcel_icon} alt="Parcel" />
            <div className="order-item-details">
              <p className="order-item-food">
                <strong>Items:</strong>{' '}
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              <p className="order-item-name">
                <strong>Name:</strong>{' '}
                {order.address?.firstName + ' ' + order.address?.lastName}
              </p>

              <div className="order-item-address">
                <p>
                  <strong>Address:</strong>{' '}
                  {[
                    order.address?.street,
                    order.address?.city,
                    order.address?.state,
                    order.address?.country,
                    order.address?.zipcode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>

              <p className="order-item-phone">
                <strong>Phone:</strong> {order.address?.phone}
              </p>

              <p>
                <strong>Total Items:</strong> {order.items.length}
              </p>

              <p>
                <strong>Amount:</strong>{' '}
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(order.amount || 0)}
              </p>

              <div className="order-status-select">
                <strong>Status:</strong>{' '}
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out Of Delivery">Out Of Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
