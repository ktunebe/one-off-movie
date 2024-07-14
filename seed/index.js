const mongooseConnection = require('../config/connection')
const { User, Thought } = require('../models')
const userSeeds = require('./users.json')
const thoughtSeeds = require('./thoughts.json')
const reactionSeeds = require('./reactions.json')

mongooseConnection.once('connected', async () => {
	await User.deleteMany()
	await Thought.deleteMany()

	const users = await User.insertMany(userSeeds)

	for (const thoughtSeed of thoughtSeeds) {
		thoughtSeed.username =
			userSeeds[Math.floor(Math.random() * userSeeds.length)].username
		let reactionArray = []
		for (const reaction of reactionSeeds) {
			reaction.username =
				userSeeds[Math.floor(Math.random() * userSeeds.length)].username
			if (0.3 > Math.random()) {
				reactionArray.push(reaction)
			}
		}
		thoughtSeed.reactions = reactionArray
	}

	const thoughts = await Thought.insertMany(thoughtSeeds)

	for (const thought of thoughts) {
		await User.findOneAndUpdate(
			{ username: thought.username },
			{ $addToSet: { thoughts: thought._id } }
		)

		//   await User.findByIdAndUpdate(thoughtUser._id, {
		//     $addToSet: { thoughts: thought._id }
		//   })
	}

	for (const user of users) {
		for (i = 0; i < users.length; i++) {
			if (users[i] !== user && 0.5 > Math.random()) {
				await User.findByIdAndUpdate(user._id, {
					$addToSet: { friends: users[i] },
				})
			}
		}
	}

	console.log('Users seeded!')
	console.log('Thoughts seeded!')

	process.exit(0)
})
