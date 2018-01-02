//Entry point of the App
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({ uploadDir: './files' });

//Db SetUP connect with mongoDB instance
mongoose.connect('mongodb://localhost:auth/auth');

//App setUP
app.use(morgan('combined'));
app.use(cors());
app.use(multipartyMiddleware);
app.use(bodyParser.json({type: '*/*'}));
router(app);


//Server SetUp
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on port : ',port);


