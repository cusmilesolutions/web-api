const Task = require('../models/task');
const validator = require('validator');

module.exports = {
  Query: {
    tasks: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      const taskList = await Task.find().sort({ createdAt: -1 });
      return {
        tasks: taskList.map((task) => {
          return task;
        }),
        totalTasks: taskList.length,
      };
    },
    subTasks: async (root, { status }, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      const taskList = await Task.find({ status }).sort({ createdAt: -1 });
      return {
        tasks: taskList.map((task) => {
          return task;
        }),
        totalTasks: taskList.length,
      };
    },
  },
  Mutation: {
    createTask: async (
      root,
      { title, description, deadline },
      { req },
      info
    ) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      if (
        validator.default.isEmpty(title) ||
        validator.default.isEmpty(description)
      )
        throw new Error('Please enter the title and description of task');
      const newTask = new Task({
        title,
        description,
        deadline,
      });
      const createdTask = await newTask.save();

      return { ...createdTask._doc, _id: createdTask._id };
    },
    deleteTask: async (root, { id }, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      const task = await Task.findByIdAndDelete(id);
      if (task) {
        return true;
      }
    },
    completeTask: async (root, { id }, { req }, info) => {
      if (!req.isAuth) {
        throw new Error('Please sign in to continue...');
      }
      const task = await Task.findByIdAndUpdate(id, { status: 'completed' });
      const completedTask = await task.save();
      return completedTask;
    },
  },
};
