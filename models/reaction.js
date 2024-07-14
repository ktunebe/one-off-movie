
const { Schema } = require('mongoose')

function formatDate(date) {
  return date.toLocaleString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  }
}, {
  toJSON: {
    getters: true
  }
})

module.exports = reactionSchema