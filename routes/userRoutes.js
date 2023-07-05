const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');


// Create a new user
router.post('/user', userController.createUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a specific user by ID
router.get('/user/:id', userController.getUserById);

// Update a user
router.patch('/user/:id', userController.updateUser);

// Delete a user
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
