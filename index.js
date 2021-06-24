const PORT = 3000;

require('dotenv').config();

const express = require('express');
const server = express();


//reads incoming JSON from requests
const bodyParser = require('body-parser');
server.use(bodyParser.json());
//logs out incoming requests
const morgan = require('morgan');
server.use(morgan('dev'));


const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});



server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });


// For our app we will define the following
// POST /api/users/register
// POST /api/users/login
// DELETE /api/users/:id

// GET /api/posts
// POST /api/posts
// PATCH /api/posts/:id
// DELETE /api/posts/:id

// GET /api/tags
// GET /api/tags/:tagName/posts