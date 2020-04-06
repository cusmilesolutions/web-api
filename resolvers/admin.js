const Admin = require('../models/admin');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const validator = require('validator');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  Query: {
    admins: (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Sorry, user not authenticated');
      }
      return Admin.find();
    },
  },
  Mutation: {
    login: async (root, { email, password }, { req }, info) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        const error = new AuthenticationError('Sorry, email is incorrect.');
        return error;
      }
      const pwdEqual = compare(password, admin.password);
      if (!pwdEqual) {
        throw new Error('Password is incorrect');
      }
      const token = sign(
        { userId: admin.id, email: admin.email },
        'etokencsecretl',
        { expiresIn: '2h' }
      );
      return { token, adminId: admin.id };
    },
    signUp: async (
      root,
      { firstName, lastName, email, password, employeeID, position },
      { req },
      info
    ) => {
      if (
        !validator.default.isEmail(email) ||
        validator.default.isEmpty(email)
      ) {
        throw new Error('Email is invalid');
      }
      if (!validator.default.isLength(password, { min: 5 }))
        throw new Error('Password should not be less than 5 letters');

      const adminExists = await Admin.findOne({ email });
      if (adminExists) {
        throw new Error('Admin account already exists');
      }

      const hashedPwd = await hash(password, 12);
      const admin = new Admin({
        firstName,
        lastName,
        email,
        password: hashedPwd,
        employeeID,
        position,
      });
      return await admin.save();
    },
    signOut: async (root, args, { req }, info) => {},
  },
};
