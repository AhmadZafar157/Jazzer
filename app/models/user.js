const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  creation_time: {
    type: Date,
    default: Date.now
  },
  user_type: {
    type: String,
    enum: ['cvm_type', 'non_cvm_type'],
    required: true
  }
});

userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};


const User = mongoose.model('User', userSchema);
module.exports = User;
