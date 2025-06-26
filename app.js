const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const sequelize = require('./utils/db_connection');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dbConfig = require('./config/db_config');
const models = require('./models'); // Import all models to ensure they are registered
const User = require('./models/user'); // Import User model to check for default user

const app = express();

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up session store
const sessionStore = new MySQLStore({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});
app.use(session({
    secret: 'minithegreat', // Change this to a secure key in production
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn || false; // Check if user is authenticated
    res.locals.user = req.session.user || null; // Store user in locals for use in views
    next();
});

app.use('/admin', adminRoutes); // /admin is the route prefix
app.use(shopRoutes);
app.use(authRoutes);
app.use((req, res, next)=>{
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {page_title: 'Page not found', route_name : ''});
});

app.use((error, req, res, next) => {
    // res.redirect('/500');
    console.error('Error occurred:', error);
    return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
});

sequelize.sync(
    {
    // alter: true, 
    // force: true
    }) // Use { force: true } to drop and recreate tables
    .then(() => {
        console.log('Database synced successfully');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });


