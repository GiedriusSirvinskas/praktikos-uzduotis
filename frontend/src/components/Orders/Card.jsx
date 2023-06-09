import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardStyles from './Orders.module.css';
import { Height } from '@mui/icons-material';
import AlertDialogSlide from './Confirmation';

export default function OutlinedCard({ order, handleApprove, handleDecline }) {
  const foodNames = order.foods.map((food) => {
    return food.foodName;
  });

  const foodAmounts = order.foods.map((food) => {
    return food.foodAmount;
  });

  const foodPrices = order.foods.map((food) => {
    return food.foodPrice;
  });

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          <span className={CardStyles.spans}>
            <span>User: {order.customerName}</span>
            <span
              className={
                order.status === 'approved'
                  ? CardStyles.green
                  : order.status === 'pending'
                  ? CardStyles.blue
                  : order.status === 'declined'
                  ? CardStyles.red
                  : ''
              }
            >
              {order.status}
            </span>
          </span>
          <br />
          Email: {order.customerEmail}
        </Typography>
        <Typography variant='h5' component='div'>
          Total: {order.totalPrice} &euro;
        </Typography>
        <div className={CardStyles.columns}>
          <div>
            <div>Food</div>
            {foodNames.map((food) => {
              return <div key={food}>{food}</div>;
            })}
          </div>
          <div>
            <div>Amount</div>
            {foodAmounts.map((food) => {
              return <div key={food}>{food}</div>;
            })}
          </div>
          <div>
            <div>Price</div>
            {foodPrices.map((food) => {
              return <div key={food}>{food}</div>;
            })}
          </div>
        </div>
      </CardContent>
      <CardActions>
        <AlertDialogSlide
          title='Approve Order'
          description='Are you sure you want to approve this order?'
          onConfirm={() => handleApprove(order._id)}
        >
          Approve
        </AlertDialogSlide>
        <AlertDialogSlide
          title='Decline Order'
          description='Are you sure you want to decline this order?'
          onConfirm={() => handleDecline(order._id)}
        >
          Decline
        </AlertDialogSlide>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined'>{card}</Card>
    </Box>
  );
}
