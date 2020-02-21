// Require mongoose
const mongoose = require('mongoose')

// Set up our schema
// What should an Order record in our database look like?
const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  size: Number,
  toppings: Array,
  status: String,
  price: Number,
  orderTimestamp: {
    type: Date,
    default: Date.now
  }
})

// Compile model from schema
const Order = mongoose.model('Order', OrderSchema)

// Export the model from this file so we can use it in our other files
module.exports = Order
