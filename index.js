const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const users = require('./routes/users');
const login = require('./routes/login');
const quizzes = require('./routes/quizzes');
const quizRecords = require('./routes/quizRecords');
const leadersBoard =  require('./routes/leadersBoard');
const quizzesOnHold = require('./routes/quizzesOnHold');
const messages = require('./routes/messages');
const favorites =  require('./routes/favorites');
require("express-async-error")
require("dotenv").config()


const session = require('express-session');
const cookieParser = require('cookie-parser');

// Middleware for session and cookies
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure:true if using https
}));

mongoose.connect(process.env.connectionUrl)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB!', err)
);


//routes
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/quizzes', quizzes);
app.use('/api/records', quizRecords);
app.use('/api/leadersboard', leadersBoard);
app.use('/api/uploadQuiz', quizzesOnHold);
app.use('/api/messages', messages);
app.use('/api/favorites', favorites);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Invalid Route" })
})

app.use((err, req, res, next) => {
  next(err)
})
//port
const port = process.env.PORT || 5000;
app.listen(port, console.log('listening on port ' + port));
app.use(express.json());