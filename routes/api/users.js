const router = require('express').Router()
const { User, Thought } = require('../../models')

// api/users endpoint 

// Create user
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
// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(req.query)
    res.json(users)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error reading users')
  }
})

// Get one user by ID
router.get('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const user = await User.findById(_id)

    res.json({ user })
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error finding user: ${_id}`)
  }
})

// Update user
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

// Delete user
router.delete('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    // Delete user by ID
    const user = await User.findByIdAndDelete(_id, req.body, { new: true })
    // Remove deleted user from other friends lists
    await User.updateMany({ friends: _id },
      { $pull: { friends: _id } },
      { new: true }
    )
    // Delete user's thoughts
    await Thought.deleteMany(
      { username: user.username }, 
      { new:true }
    )

    res.json(`User ${user.username} and their thoughts have been deleted, and ${user.username} has been removed from other users' friends lists!`)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error deleting user: ${_id}`)
  }
})

// Add user ID to another user's friends list
router.post('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params
  try {
    const user = await User.findByIdAndUpdate(userId, 
      { $addToSet: { friends: friendId } },
      { new: true }
    )
    console.log(user)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error adding friend')
  }
})

// Remove user ID from another user's friends list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params
  try {
    const user = await User.findByIdAndUpdate(userId, 
      { $pull: { friends: friendId } },
      { new: true }
    )
    console.log(user)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error removing friend')
  }
})

module.exports = router