const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://azafar506:Ahmad_zafar1999.@cluster0.krhpsmf.mongodb.net/?retryWrites=true&w=majority`; //to .env

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
