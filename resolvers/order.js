const Order = require('../models/order');
const Admin = require('../models/admin');
const Rider = require('../models/rider');

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
      return order._doc;
    },
    subOrders: async (root, { status }, { req }, info) => {
      const orderList = await Order.find({ orderStatus: status });
      return {
        orders: orderList.map((order) => {
          return order;
        }),
        totalOrders: orderList.length,
      };
    },
    paymentStatus: async (root, { status }, { req }, info) => {
      const orderList = await Order.find({ 'payment.status': status });
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
        senderName,
        senderPhone,
        recipientName,
        recipientPhone,
        itemName,
        itemType,
        itemCount,
        description,
        price,
        method,
        startPt,
        deliveryPt,
      },
      { req },
      info
    ) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      if (
        validator.default.isEmpty(senderName) ||
        validator.default.isEmpty(senderPhone) ||
        validator.default.isEmpty(recipientName) ||
        validator.default.isEmpty(recipientPhone) ||
        validator.default.isEmpty(itemName) ||
        validator.default.isEmpty(itemType) ||
        validator.default.isEmpty(itemCount) ||
        validator.default.isEmpty(price) ||
        validator.default.isEmpty(method) ||
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
        sender: { senderName, senderPhone },
        recipient: { recipientName, recipientPhone },
        item: { itemName, itemCount, itemType, description },
        payment: { price, method },
        shipping: { startPt, deliveryPt },
        creator: admin,
      });
      const createdOrder = await newOrder.save();
      admin.orders.push(createdOrder);
      await admin.save();
      return { ...createdOrder._doc, _id: createdOrder._id };
    },
    assignRider: async (root, { id, riderID }, { req }, info) => {
      const order = await Order.findById(id);
      const rider = await Rider.findOne({ riderId: riderID }).exec();
      if (!rider) {
        throw new Error('Rider does not exist');
      }
      order.rider = rider._id;
      order.orderStatus = 'delivered';
      order.shipping.dateDelivered = new Date().toLocaleDateString();
      order.shipping.timeDelivered = new Date().toLocaleTimeString();
      rider.orders.push(order);
      await rider.save();
      const assignedOrder = await order.save();
      return { ...assignedOrder._doc, _id: assignedOrder._id };
    },
    approveOrder: async (root, { id }, { req }, info) => {
      const order = await Order.findByIdAndUpdate(id, {
        orderStatus: 'approved',
      });
      const approvedOrder = await order.save();
      return approvedOrder;
    },
    cancelOrder: async (root, { id }, { req }, info) => {
      const order = await Order.findByIdAndUpdate(id, {
        orderStatus: 'cancelled',
      });
      const cancelledOrder = await order.save();
      return cancelledOrder;
    },
    deliveredOrder: async (root, { id }, { req }, info) => {
      const order = await Order.findByIdAndUpdate(id, {
        orderStatus: 'delivered',
      });
      const cancelledOrder = await order.save();
      return cancelledOrder;
    },
  },
};
