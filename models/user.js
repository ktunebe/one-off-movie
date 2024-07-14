const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				// Checks for valid email address
				validator: function (v) {
					return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
				},
			},
		},
		thoughts: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Thought',
				},
			],
		},
		friends: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
)

// Create virtual property 'friendCount' that gets the amount of friends the user has
userSchema.virtual('friendCount').get(function () {
	return this.friends.length
})

const User = model('User', userSchema)

module.exports = User
