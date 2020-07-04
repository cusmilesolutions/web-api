const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderNo: String,
    item: {
      itemName: String,
      itemType: String,
      itemCount: String,
      description: String,
    },
    payment: {
      price: String,
      method: { type: String, default: 'cash' },
      status: { type: String, default: 'pending' },
      date: { type: String, default: '' },
    },
    sender: {
      senderName: String,
      senderPhone: String,
    },
    recipient: {
      recipientName: String,
      recipientPhone: String,
    },
    shipping: {
      startPt: String,
      deliveryPt: String,
      dateDelivered: String,
      timeDelivered: String,
    },
    rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
    orderStatus: { type: String, default: 'pending' },
    creator: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
