const router = require('express').Router()
const { Thought, User, reactionSchema } = require('../../models')

// /api/thoughts endpoint

// Create thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body)
    const user = await User.findOneAndUpdate(
      { username: thought.username },
      { $addToSet: { thoughts: thought } },
      { new: true }
    )
    res.json(`Thought '${thought.thoughtText}' has been added by ${user.username} (Thought ID: ${thought._id}, User ID: ${user._id})`)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error creating thought')
  }
})

// Read
// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find(req.query)
    res.json(thoughts)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error reading thoughts')
  }
})

// Get one thought by ID
router.get('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const thought = await Thought.findById(_id)

    res.json({ thought })
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error finding thought: ${_id}`)
  }
})

// Update thought
router.put('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const thought = await Thought.findByIdAndUpdate(_id, req.body, { new: true })
    res.json(thought)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error updating thought: ${_id}`)
  }
})

// Delete thought by id
router.delete('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const thought = await Thought.findByIdAndDelete(_id, req.body, { new: true })
    await User.findOneAndUpdate(
      { thoughts: thought._id }, 
      { $pull: { thoughts: thought._id } }, 
      { new: true })

    res.json(`Thought has been deleted!`)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error deleting thought: ${_id}`)
  }
})

// Create a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  const { thoughtId } = req.params
  try {
    const reaction = req.body
    await Thought.findByIdAndUpdate(thoughtId, 
      { $addToSet: { reactions: reaction } },
      { new: true }
    )
    res.json(reaction)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error adding reaction')
  }
})

// Delete reaction by id
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  const { thoughtId, reactionId } = req.params
  try {
    await Thought.findByIdAndUpdate(
      thoughtId, 
      { $pull: { reactions: {_id: reactionId} } }, 
      { new: true })

    res.json(`Reaction has been deleted!`)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error deleting reaction: ${reactionId}`)
  }
})

module.exports = router