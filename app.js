/** Setup express */
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Serving on port 3000');
})

/** Setup ejs */
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/** Test */
app.get('/', (req, res) => {
    res.render('home.ejs');
})
