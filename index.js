const http = require('http');
const mongo = require('./config.js');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

const port = 3000;

mongo.runConnection();
// Parse JSON bodies for incoming requests
app.use(express.json());

// Mount the user routes
app.use('/', userRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
