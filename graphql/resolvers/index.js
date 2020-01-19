const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Event = require('../../models/Event')
const User = require('../../models/User')
const Project = require('../../models/Project')

module.exports = {
  projects: async () => {
    const projects = await Project.find()
    return projects.map(events => {
      return { ...event._doc, _id: event.id }
    })
  },
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return { ...event._doc, _id: event.id }
        })
      })
      .catch(err => {
        throw err
      })
  },
  users: () => {
    return User.find()
      .then(users => {
        return users.map(user => {
          return { ...user._doc, _id: user.id }
        })
      })
      .catch(err => {
        throw err
      })
  },
  createEvent: args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date)
    })

    return event
      .save()
      .then(result => {
        return { ...result._doc, _id: result._doc._id.toString() }
      })
      .catch(err => {
        throw err
      })
  },
  createUser: args => {
    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error('User exists already.')
        }
        return bcrypt.hash(args.userInput.password, 12)
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        })
        return user.save()
      })
      .then(result => {
        return { ...result._doc, password: null, _id: result.id }
      })
      .catch(err => {
        throw err
      })
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })

    if (!user) {
      throw new Error()
    }

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) {
      throw new Error('Password is incorrect')
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'secre012', {
      expiresIn: '1h'
    })

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    }
  }
}
