const { Schema, model } = require('mongoose')

const adminModel = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isDeleted:{
    type: Boolean,
    required: true
  },
  isAdmin:{
    type: Boolean,
    required: true
  }
})

module.exports = model('Admin', adminModel)