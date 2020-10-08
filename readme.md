# Setting up a MongoDB API

## First Set up a basic Express Server

1. Create directory and then run: git init to create a package.json file
2. Npm install crypt express jsonwebtoken mongoose nodemon
3. Start VSCode: code .
4. Create src folder in root directory to house all code
5. Create a .gitignore file and exclude node_modules
6. In the src file, create a file named index.js and set up a basic server with a GET:

   const express = require('express')

   const app = express()

   app.get('/', (req, res) => {
   res.send('Sup')
   })

   const PORT = 9999

   app.listen(PORT, () => {
   console.log(`*** Listening on port: ${PORT} ***`)
   })

7. Create a start script in package.json to start server

   "scripts": {
   "start:: "node src/index.js",
   "server": "nodemon src/index.js"
   }

8. In root directory run the server: npm run server

## Set up MongoDB instance

1. Go to cloud.mongodb.com and go through the steps to create a new project and cluster
2. Once cluster is created configure:
   1. Click on the 'connect' button on the cluster screen
   2. Click to 'add your current ip address'
   3. Create a MongoDB user for the database
      1. Username - admin
      2. password - PasswordPassword
   4. Click on 'Choose a connection method'
      1. Select option to connect your application
      2. Copy connection string on next screen
3. In index.js, create a variable to store the string:
   1. const mongoUri = 'mongodb+srv://admin:<password>@cluster0.vra0b.mongodb.net/<dbname>?retryWrites=true&w=majority'
   2. replace the <password> in the string with your actual password
4. require mongoose in index.js - const mongoose = require('mongoose')
5. Connect to the mongdoDB using mongoose. Just after the const mongoUri line, add:

   mongoose.connect(mongoUri, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
   })

6. Turn on the mongoose connection. Just after the mongoose.connect line above, add:

mongoose.connection.on('connected', () => {
console.log('Connected to mongoDB instance')
})

mongoose.connection.on('error', (err) => {
console.error('Error connecting to mongo', err)
})

7. Save files and run server and see if connection to both server port and mongoose was successful

## Set up user Authentication

1. in src directory create a folder called 'routes'
2. create a file in the routes folder called authRoutes.js and put the following code in it:

   const express = require('express')

   const router = express.Router()

   router.post('/signup', (req, res) => {
   res.send('You made a post request')
   })

   module.exports = router

3. in Index.js, require authRoutes and then use it - (app.use(authRoutes))
4. Test route in Insomnia or Postman
5. In index.js require body-parser in order to enable to api to read json info - const bodyParser = require('body-parser)
6. add app.use(bodyParser.json()) before the auth routes use line
7. console.log the req.body in the /signup route

   router.post('/signup', (req, res) => {
   console.log(req.body)
   res.send('You made a post request')
   })

8. Use mongoose to set up User schema. In the src directory, create a new directory called models
9. Create a User.js file in the models folder

   const mongoose = require('mongoose')

   const userSchema = new mongoose.Schema({
   email: {
   type: String,
   unique: true,
   required: true,
   },
   password: {
   type: String,
   required: true
   }
   })

mongoose.model('User', userSchema)

10. require the User.js file in index.js at the top - require('./models/User)
11. require and make User const at top of authRoutes.js

    const mongoose = require('mongoose')
    const User = mongoose.model('User')
