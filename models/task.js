const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    dueTime: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: 'uncompleted',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Task', taskSchema);
