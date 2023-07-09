const User = require('../models/user');
const createToken = require('../../public/token_generator')


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a token
    const token = createToken(user);

    // Set the token as a cookie
    res.cookie('jwt', token);

    // Return the user and token
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, user_type } = req.body;

    const user = new User({ name, email, password, user_type });
    const token = createToken(user);
    res.cookie('jwt', token);
    const savedUser = await user.save();
    console.log("Token : " + token);  //to be handled later on
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      const validationErrors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: validationErrors });
    } else {
      // Handle other errors
      res.status(500).json({ error: error.message });
    }
  }
};


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, user_type } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.userId, { name, email, user_type }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
