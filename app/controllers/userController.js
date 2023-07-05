const User = require('../models/user'); // Assuming the user model is in a file called user.js
const { db } = require('../../config')
// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("Hello came here to create a user!");
    const { name, email, password, user_type } = req.body;
    const user = new User({ name, email, password, user_type });
    console.log("hey now");
    const result = await User.create(user);

    console.log("Results : " + result);
    //const savedUser = await User.insertOne(user);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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
    const { id } = req.params;
    const { name, email, user_type } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, user_type }, { new: true });
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
