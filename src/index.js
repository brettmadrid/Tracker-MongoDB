require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middleware/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri =
  'mongodb+srv://admin:PasswordPassword@cluster0.vra0b.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB instance')
})

mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is: ${req.user.email}`)
})

const PORT = 9999

app.listen(PORT, () => {
  console.log(`*** Listening on port: ${PORT} ***`)
})
