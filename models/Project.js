const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String
  },
  file: {
    type: String
  },
  xp: {
    type: Number
  },
  description: {
    type: String
  },
  linkToPrior: {
    type: String
  },
  minimumLevelRequired: {
    type: String
  },
  placeOnTheMap: {
    type: String
  }
})

module.exports = mongoose.model('Project', projectSchema)
