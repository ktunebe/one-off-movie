const express = require('express')
const mongooseConnection = require('./config/connection')
const routes = require('./routes')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())

app.use(routes)

mongooseConnection.once('connected', () => {
  console.log('Mongoose connected!')

  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))
})