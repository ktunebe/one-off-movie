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

module.exports = router