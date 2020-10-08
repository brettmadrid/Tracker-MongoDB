const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  // pass to the User table the object with the required fields
  const user = new User({ email, password })
  try {
    await user.save() // create user on mongoDB

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
    res.send({ token })
  } catch (err) {
    return res.status(422).send(err.message)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).send({ error: 'password or email does not match' })
  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
    res.send({ token })
  } catch (err) {
    return res.status(401).send({ error: 'password or email does not match' })
  }
})

module.exports = router
