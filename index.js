const http = require('http');
const connectDB = require('./config.js');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

connectDB();
// Parse JSON bodies for incoming requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Mount the user routes
app.use('/', userRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
