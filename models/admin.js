const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    employeeID: String,
    position: String,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
