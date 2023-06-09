import axios from 'axios';
import { useState, useEffect } from 'react';
import OrderStyles from './Orders.module.css';
import Card from './Card';
import { useParams } from 'react-router-dom';
import BasicPagination from './BasicPagination';
import PositionedSnackbar from '../Cart/Snackbar';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersURL = 'http://localhost:3000/orders/';
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${ordersURL}?page=${currentPage}&limit=8`
        );
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    };

    fetchOrders();
  }, [currentPage, orders]);

  const handleApprove = (id) => {
    try {
      axios.patch(ordersURL + id + '/approve', {
        status: 'approved',
      });
      setSubmitMessage('Succesfully approved an order!');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDecline = (id) => {
    try {
      axios.patch(ordersURL + id + '/decline', {
        status: 'declined',
      });
      setSubmitMessage('Succesfully declined an order!');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDelete = (id) => {
    try {
      axios.delete(ordersURL + id);
      setSubmitMessage('Succesfully deleted an order!');
    } catch {
      setError(error.response.data.error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={OrderStyles.container}>
        {orders.map((order) => {
          return (
            <Card
              order={order}
              key={order._id}
              handleApprove={handleApprove}
              handleDecline={handleDecline}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      <BasicPagination
        count={totalPages}
        page={currentPage.toString()}
        onPageChange={handlePageChange}
      />
      {(error || submitMessage) && (
        <PositionedSnackbar
          open={!!error || !!submitMessage}
          message={error || submitMessage}
          onClose={() => {
            setError('');
            setSubmitMessage('');
          }}
          isError={!!error}
        />
      )}
    </>
  );
}

export default Orders;
