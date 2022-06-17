const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    // min: 6,
    // max: 255,
  },
  email: {
    type: String,
    required: true,
    // max: 255,
    // min: 6,
  },
  password: {
    type: String,
    required: true,
    // max: 1024,
    // min: 6,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
      type: Date,
      default: Date.now
  }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
      next();
    }
    else {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt)
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Users', userSchema)