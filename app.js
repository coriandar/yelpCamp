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

/** setup ejs */
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/** setup ejs-mate */
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

/** setup Schemas */
const Campground = require('./models/campground.js');

/** method override, allow put, patch */
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

/** parse */
app.use(express.urlencoded ({extended: true}));

/** routes */
app.get('/', (req, res) => {
    res.render('home.ejs');
})

// all
app.get('/campground', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index.ejs', { campgrounds });
})

// create
app.get('/campground/new', (req, res) => {
    res.render('campground/new.ejs');
})

// post
app.post('/campground', async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect(`/campground/${camp._id}`);
})

// by :id
app.get('/campground/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campground/show.ejs', { campground });
})

// edit
app.get('/campground/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campground/edit.ejs', { campground });
})

app.put('/campground/:id', async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campground/${camp._id}`);
})

// delete
app.delete('/campground/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campground');
})
