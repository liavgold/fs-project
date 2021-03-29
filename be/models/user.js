const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
  name: {
    type: string,
    required: true,
  }
},{timestamp: true});
module.exports = mongoose.model('User' , userSchema);
