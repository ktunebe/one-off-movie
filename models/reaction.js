const { Schema } = require('mongoose')

// Formats date to Month, DD YYYY
function formatDate(date) {
	return date.toLocaleString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}

const reactionSchema = new Schema(
	{
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// Calls date formatting method
			get: formatDate,
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
)

module.exports = reactionSchema
