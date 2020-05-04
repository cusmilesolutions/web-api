const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = new Schema(
  {
    shippingId: String,
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
    shippingStatus: { type: String, default: 'pending' },
    paymentStatus: { type: String, default: 'pending' },
    paymentMethod: String,
    creator: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shipping', shippingSchema);
