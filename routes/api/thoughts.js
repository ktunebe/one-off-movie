const router = require('express').Router()
const { Thought } = require('../../models')

// Create
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body)
    console.log(thought)
    res.json(thought)
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

module.exports = router