const Order = require('../models/order');
const Admin = require('../models/admin');

const validator = require('validator');

module.exports = {
  Query: {
    orders: async (root, args, { req }, info) => {
      const orderList = await Order.find().sort({ createdAt: -1 });
      return {
        orders: orderList.map((order) => {
          return order;
        }),
        totalOrders: orderList.length,
      };
    },
    order: (root, { id }, { req }, info) => {
      const order = Order.findById(id);
      if (!order) {
        throw new Error('Order does not exist');
      }
      return order;
    },
    subOrders: async (root, { status }, { req }, info) => {
      const orderList = await Order.find({ status });
      return {
        orders: orderList.map((order) => {
          return order;
        }),
        totalOrders: orderList.length,
      };
    },
  },
  Mutation: {
    addOrder: async (
      root,
      {
        customerName,
        customerPhone,
        itemName,
        itemType,
        itemCount,
        price,
        startPt,
        deliveryPt,
        description,
      },
      { req },
      info
    ) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      if (
        validator.default.isEmpty(customerName) ||
        validator.default.isEmpty(customerPhone) ||
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
        customerName,
        customerPhone,
        itemName,
        itemType,
        itemCount,
        price,
        startPt,
        deliveryPt,
        description,
        creator: admin,
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
    },
  },
};
