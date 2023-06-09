import CartStyles from './Cart.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { totalPrice } from '../../utils/totalPrice';
import SpanningTable from './SpanningTable';
import Button from '@mui/material/Button';

function Cart() {
  const [cart, setCart] = useState([]);
  const cartURL = 'http://localhost:3000/cart/';
  const [error, setError] = useState(undefined);
  const [submitMessage, setSubmitMessage] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});

  const orderURL = 'http://localhost:3000/orders';
  const currentUserURL = 'http://localhost:3000/users/getName';

  useEffect(() => {
    try {
      axios.get(cartURL).then((res) => setCart(res.data));
      axios.get(currentUserURL).then((res) => setCurrentUser(res.data));
    } catch {
      setError(error.response.data);
    }
  }, [cart]);

  const handleDelete = (id) => {
    try {
      axios.delete(cartURL + id);
      setSubmitMessage('Successfully removed an item');
      setTimeout(() => {
        setSubmitMessage('');
      }, 2000);
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const handleOrder = () => {
    try {
      const foods = cart.map((item) => ({
        foodName: item.foodName,
        foodAmount: item.amount,
        foodPrice: item.foodPrice,
      }));

      axios.post(orderURL, {
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        totalPrice: totalPrice(cart),
        foods: foods,
      });
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div>
      <SpanningTable cart={cart} handleDelete={handleDelete} />
      <Button variant='outlined' onClick={handleOrder}>Order</Button>
    </div>
  );
}

export default Cart;
