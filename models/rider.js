const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    pin: String,
    riderId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rider', riderSchema);
