const Rider = require('../models/rider');
const Admin = require('../models/admin');
const validator = require('validator');

module.exports = {
  Query: {
    riders: (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Sorry, you do not have permision to view.');
      }
      return Rider.find();
    },
    rider: async (root, { id }, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Sorry, you do not have permision to view.');
      }
      const rider = await Rider.findById(id);
      if (!rider) {
        throw new Error('Rider does not exist');
      }
      return rider;
    },
  },
  Mutation: {
    addRider: async (
      root,
      { firstName, lastName, address, phone },
      { req },
      info
    ) => {
      if (
        validator.default.isEmpty(firstName) ||
        validator.default.isEmpty(lastName) ||
        validator.default.isEmpty(phone)
      ) {
        throw new Error('Please fill the required spaces');
      }
      if (!validator.default.isLength(phone, { min: 10, max: 10 })) {
        throw new Error('Phone number should be 10 digits');
      }
      const riderExists = await Rider.findOne({ phone, firstName, lastName });
      if (riderExists) {
        throw new Error('Rider with this data already exist');
      }
      const admin = await Admin.findById(req.userId);
      if (!admin) {
        throw new Error('Invalid admin id');
      }
      const riderTotal = await Rider.find().countDocuments();
      let riderId = `RECL${riderTotal + 1}`;
      const riderIdExists = await Rider.findOne({ riderId });
      if (riderIdExists) {
        riderId = `RECL${riderTotal + Math.floor(Math.random() * 10)}`;
      }
      const rider = new Rider({
        firstName,
        lastName,
        address,
        phone,
        riderId,
        creator: admin,
      });
      return await rider.save();
    },
    removeRider: async (root, { id }, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Sorry, you need to sign in to perform this function');
      }
      await Rider.findByIdAndRemove(id);
      return true;
    },
  },
};
