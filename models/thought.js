const { Schema, model } = require('mongoose')
const reactionSchema = require('./reaction')

function formatDate(date) {
  return date.toLocaleString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema],
}, {
  toJSON: {
    getters: true,
    virtuals: true
  }
})

// Creates virtual property 'reactionCount' that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought 