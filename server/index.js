//Entry point of the App
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// const upload = multer({ dest: 'files/' }) // rename to Uploads

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'files/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage });

mongoose.connect('mongodb://localhost:auth/auth');

app.use('/files', express.static(path.join(__dirname, 'files')));

//App setUP
app.use(morgan('combined'));
app.use(cors());
// app.use(upload.any());
// app.use(bodyParser.json({type: '*/*'}));

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))

router(app);


//Server SetUp
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on port : ',port);


