const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    riderId: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    creator: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rider', riderSchema);
