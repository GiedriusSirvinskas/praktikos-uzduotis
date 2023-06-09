import axios from 'axios';
import { useState, useEffect } from 'react';
import OrderStyles from './Orders.module.css';
import Card from './Card';
import { useParams } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const ordersURL = 'http://localhost:3000/orders/';
  const {id} = useParams();
  useEffect(() => {
    try {
      axios.get(ordersURL).then((res) => setOrders(res.data));
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }, []);

  const handleApprove = (id) => {
    try {
      axios.patch(ordersURL + id + '/approve', {
        status: 'approved',
      });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDecline = (id) => {
    try {
      axios.patch(ordersURL + id + '/decline', {
        status: 'declined',
      });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className={OrderStyles.container}>
      {orders.map((order) => {
        return <Card order={order} key={order._id} handleApprove={handleApprove} handleDecline={handleDecline}/>;
      })}
    </div>
  );
}

export default Orders;
