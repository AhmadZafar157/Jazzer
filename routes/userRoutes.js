const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');


// Sign-up / create user
router.post('/signup', userController.createUser);

// Login
router.post('/login', userController.login);

// Get all users
router.get('/users', userController.getUsers);

// Get a specific user by ID
router.get('/user', userController.getUser);

// Update a user
router.patch('/user', userController.updateUser);

// Delete a user
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
