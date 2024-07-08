const { Schema, model } = require('mongoose')
const Thought = require('./thought')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      }
    }
  },
  thoughts: [Thought],
  friends: [User]
})

userSchema.methods.friendCount = function() {
  return this.friends.length
}

const User = model('User', userSchema)

module.exports = User