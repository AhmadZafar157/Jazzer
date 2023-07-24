const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate name criteria
        const nameRegex = /\s/;
        return nameRegex.test(value);
      },
      message: 'Name must contain at least one space'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: function (value) {
        // Validate email domain
        return value.endsWith('@jazz.com.pk');
      },
      message: 'Email must have the domain "@jazz.com.pk"'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate password criteria
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
        return passwordRegex.test(value);
      },
      message: 'Password must have at least 8 characters, at least one uppercase letter, at least one lowercase letter, and at least one numeric digit'
    }
  },
  creation_time: {
    type: Date,
    default: Date.now
  },
  team_id: {
    type: String,
  }, 
  user_type: {
    type: String,
    enum: ['cvm_type', 'non_cvm_type' , 'super_admin'],
    required: true,
    default: 'non_cvm_type'
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
