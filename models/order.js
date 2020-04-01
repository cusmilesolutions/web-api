const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderNo: String,
    customer: String,
    itemName: String,
    itemType: String,
    itemCount: String,
    price: String,
    startPt: String,
    deliveryPt: String,
    description: String,
    status: { type: String, default: 'pending' },
    creator: { type: Schema.Types.ObjectId, ref: 'Admin' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
