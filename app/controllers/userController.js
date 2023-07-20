const User = require('../models/user');
const createToken = require('../../public/token_generator')
const generateResponse = require('../../public/generate_response');


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      response = generateResponse(400 , "User not found!" , "" , "");
      res.send(response);
      return;
    }

    // Validate the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      response = generateResponse(400 , "Invalid Password!" , "" , "");
      res.send(response);
      return;
    }

    // Generate a token
    const token = createToken(user);

    // Set the token as a cookie
    // res.cookie('jwt', token);
    // res.cookie('jwt', token, { secure: false, httpOnly: true , withCredentials: true});
    user.token = token;

    // Return the user and token
    response = generateResponse(200 , "User logged in successfully!" , "" , {...user._doc, token});
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};


// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, user_type } = req.body;

    const user = new User({ name, email, password, user_type });
    const token = createToken(user);
    // res.cookie('jwt', token);
    const savedUser = await user.save();
    console.log("Token : " + token);  //to be handled later on
    response = generateResponse(200 , "User created successfully!" , "" , {...savedUser._doc, token});
    res.send(response);
    return;
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    response = generateResponse(200 , "Users list" , "" , users);
    res.send(response);
    return;
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Get a specific user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      response = generateResponse(400 , "User not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "User found!" , "" , user);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
      res.send(response);
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, user_type } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.userId, { name, email, user_type }, { new: true });
    if (!updatedUser) {
      response = generateResponse(400 , "User not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Updated user!" , "" , updatedUser);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      response = generateResponse(400 , "User not found!" , "" , "");
      res.send(response);
    }
    response = generateResponse(200 , "User deleted Successfully!" , "" , "");
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};
