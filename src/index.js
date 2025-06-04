import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js';
import userController from './controllers/userController.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/authMiddleware.js';

// Init express instance
const app = express();

// Add static middleware
app.use(express.static('./src/public'));

// Add cookie parser
app.use(cookieParser());

// Add body parser
app.use(express.urlencoded());

// Add auth middleware
app.use(auth);

// Add and config view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating(rating) {
            return '★'.repeat(Math.floor(rating));
            // return '&#x2605;'.repeat(Math.floor(rating));
        }
    },
    // Allow handlebars to use prototyp methods and properties of the base mongoose document
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    }
}));

// Connect database
try {
    await mongoose.connect(`mongodb://localhost:27017`, { dbName: 'magic-movies-may2025' })
    console.log('Successfully Conect to DB!');
} catch (err) {
    console.log('Cannot connect to DB!');
    console.log(err.message);
}

// Set default engine
app.set('view engine', 'hbs');

// Set default view folder
app.set('views', './src/views');

// Config routes
app.use(homeController);
app.use('/movies', movieController);
app.use('/casts', castController);
app.use('/users', userController);
app.all('*url', (req, res) => {
    res.render('404');
});

// Start express web server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));
