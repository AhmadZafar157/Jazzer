const http = require('http');
const connectDB = require('./config.js');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const tdCredentialRoutes = require('./routes/tdCredentialRoutes');
const app = express();
const bodyParser = require("body-parser");
const authMiddleWare = require('./public/authorization_middleware');
const cookieParser = require('cookie-parser');

const port = 3000;

connectDB();
// Parse JSON bodies for incoming requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());

app.use(authMiddleWare);
// Mount the user routes
app.use('/', userRoutes);
app.use('/', tdCredentialRoutes)

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
