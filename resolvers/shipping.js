const Shipping = require('../models/shipping');
const Admin = require('../models/orders');

module.exports = {
  Query: {
    shippings: (root, args, { req }, info) => {
      const shippingList = Shipping.find().sort({ createdAt: -1 });
      return {
        shippings: shippingList.map((shipping) => {
          return shipping;
        }),
        totalShippings: shippingList.length,
      };
    },
    shipping: (root, { id }, { req }, info) => {
      const shipping = Shipping.findById(id);
      if (!shipping) {
        throw new Error('No such shipping detail exist');
      }
      return shipping;
    },
  },
};
