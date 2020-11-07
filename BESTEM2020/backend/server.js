const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const playersRouter = require('./routes/api/player');

app.use(express.json());
app.use(cookieParser());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log('MongoDB database connection established successfully!'))
    .catch(err => console.log(err));

app.use('/api/players', playersRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
