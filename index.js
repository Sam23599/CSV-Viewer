const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = process.env.PORT || 6100;
const path = require('path');


// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// middlewar for static files
app.use(express.static('./assets'));

// setup layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// extract style and scripts from sub layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// make upload path available for the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// set up routes
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error on server port: ${port}`);
    }
    console.log(`Server is up at port: ${port}`);
});

