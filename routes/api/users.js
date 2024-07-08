const router = require('express').Router()
const { User } = require('../../models')

// Create
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    console.log(user)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error creating user')
  }
})

// Read
// Get all
router.get('/', async (req, res) => {
  try {
    const users = await User.find(req.query)
    res.json(users)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error reading users')
  }
})

// Get one by ID
router.get('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const user = await User.findById(_id)

    user.logStock()

    const stockHTML = user.getStockHTML()

    res.json({ ...user.toObject, stockHTML })
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error finding user: ${_id}`)
  }
})

// Update
router.put('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true })
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error updating user: ${_id}`)
  }
})
// Delete
router.delete('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const user = await User.findByIdAndDelete(_id, req.body, { new: true })
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error deleting user: ${_id}`)
  }
})

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.create(req.body)
    console.log(user)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error creating user')
  }
})

module.exports = router