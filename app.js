/** setup express */
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Serving on port 3000'));

/** setup mongoose */
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected'));

/**setup ejs */
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/** setup Schemas */
const Campground = require('./models/campground.js');

/** test */
app.get('/', (req, res) => {
    res.render('home.ejs');
})

// app.get('/make', async (req, res) => {
//     const camp = new Campground( { title: 'beach', description: 'good'});
//     await camp.save();
//     res.send(camp);
// });