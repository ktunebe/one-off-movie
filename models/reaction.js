
const { ObjectId } = require('mongodb')
const { Schema, model, ObjectId } = require('mongoose')

const reactionSchema = new Schema({
  reactionId: {
    type: ObjectId,
    default: new ObjectId
  },
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
    default: Date.now
  }
})

module.exports = reactionSchema