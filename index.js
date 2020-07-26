const express = require('express');
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

require('dotenv').config();

const app = express();
const auth = require('./middlewares/auth');
app.use(auth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req, res }) => ({ req, res }),
  engine: {
    reportSchema: true,
  },
  introspection: true,
});
server.applyMiddleware({ app });
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    // 'mongodb://localhost:27017/ecl-web',
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-jw97h.mongodb.net/${process.env.MONGODB_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Database connected');
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`http://localhost:${process.env.PORT}${server.graphqlPath}`)
    );
  })
  .catch((err) => console.log(err));
