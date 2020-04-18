const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const users = require('./app/users');
const photos = require('./app/photos');

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/users', users);
    app.use('/photos', photos);

    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});