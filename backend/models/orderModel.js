const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required']
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },
  foods: [
    {
      foodName: {
        type: String,
        required: [true, 'Food name is required']
      },
      foodAmount: {
        type: Number,
        required: [true, 'Food amount is required']
      },
      foodPrice: {
        type: Number,
        required: [true, 'Food price is required']
      }
    }
  ]
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;