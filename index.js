const express = require('express')
const app = express()
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')

const graphiqlSchema = require('./graphql/schema/index')
const graphResolvers = require('./graphql/resolvers/index')

app.use(express.json())

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphiqlSchema,
    rootValue: graphResolvers
  })
)

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    throw new Error(err)
  })

app.listen(8080, () => console.log('server running'))
