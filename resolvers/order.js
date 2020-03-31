const Order = require('../models/order');
const Admin = require('../models/admin');

const validator = require('validator');

module.exports = {
  Query: {
    orders: (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      return Order.find();
    },
    order: (root, { id }, { req }, info) => {
      const order = Order.findById(id);
      if (!order) {
        throw new Error('Order does not exist');
      }
      return order;
    },
    onDeliveryOrders: (root, args, { req }, info) => {
      return Order.find({ status: 'approved' });
    },
    cancelledOrders: (root, args, { req }, info) => {
      return Order.find({ status: 'cancelled' });
    },
    deliveredOrders: (root, args, { req }, info) => {
      return Order.find({ status: 'delivered' });
    }
  },
  Mutation: {
    addOrder: async (
      root,
      {
        customer,
        itemName,
        itemType,
        itemCount,
        price,
        startPt,
        deliveryPt,
        description
      },
      { req },
      info
    ) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      if (
        validator.default.isEmpty(customer) ||
        validator.default.isEmpty(itemName) ||
        validator.default.isEmpty(itemType) ||
        validator.default.isEmpty(itemCount) ||
        validator.default.isEmpty(price) ||
        validator.default.isEmpty(startPt) ||
        validator.default.isEmpty(deliveryPt)
      ) {
        throw new Error('Please fill the required spaces');
      }
      const admin = await Admin.findById(req.userId);

      if (!admin) {
        throw new Error('Invalid admin id');
      }
      const orderTotal = await Order.find().countDocuments();
      const orderNo = `ECL${orderTotal + 1}`;

      const newOrder = new Order({
        orderNo,
        customer,
        itemName,
        itemType,
        itemCount,
        price,
        startPt,
        deliveryPt,
        description,
        creator: admin
      });
      const createdOrder = await newOrder.save();
      admin.orders.push(createdOrder);
      await admin.save();
      return { ...createdOrder._doc, _id: createdOrder._id };
    },
    approveOrder: async (root, { id }, { req }, info) => {
      const order = await Order.findByIdAndUpdate(id, { status: 'approved' });
      const approvedOrder = await order.save();
      return approvedOrder;
    },
    cancelOrder: async (root, { id }, { req }, info) => {
      const order = await Order.findByIdAndUpdate(id, { status: 'cancelled' });
      const cancelledOrder = await order.save();
      return cancelledOrder;
    },
    deliveredOrder: async (root, { id }, { req }, info) => {
      const order = await Order.findByIdAndUpdate(id, { status: 'delivered' });
      const cancelledOrder = await order.save();
      return cancelledOrder;
    }
  }
};
