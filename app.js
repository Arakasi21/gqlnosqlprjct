    // мангус, экспресс и графql
    const express = require('express');
    const bodyParser = require('body-parser');
    const graphqlHttp = require('express-graphql').graphqlHTTP;
    const mongoose = require('mongoose');

    const graphQlSchema = require('./graphql/schema/index');
    const graphQlResolvers = require('./graphql/resolvers/index');
    const isAuth = require('./middleware/is-auth');

    const app = express();

    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
          return res.sendStatus(200);
        }
        next();
      });

    app.use(isAuth);
    
    app.use(
    '/graphql',
    graphqlHttp({
        // это схема graphql которая инициализирует все структуры / модельки / круд операции
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
    })
    );

    

    // подключение к Atlas mongodb cluster
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hegmj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(8000); //mayub
    })
    .catch(err=>{
        console.log(err);
    });

