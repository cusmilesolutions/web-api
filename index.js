const express = require('express');
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const {
  PORT = 5000,
  NODE_ENV = 'development',
  MONGO_URI = 'mongodb://localhost:27017/ecl_web'
} = process.env;

(async () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const app = express();
    const auth = require('./auth');
    app.use(auth);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true,
      context: ({ req, res }) => ({ req, res })
    });
    server.applyMiddleware({ app });
    app.listen(PORT, () =>
      console.log(`http://localhost:${PORT}${server.graphqlPath}`)
    );
  } catch (err) {
    console.error(err);
  }
})();
