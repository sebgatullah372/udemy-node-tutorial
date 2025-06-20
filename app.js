const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./utils/db_connection');
const models = require('./models'); // Import all models to ensure they are registered
const app = express();

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // /admin is the route prefix
app.use(shopRoutes);

app.use((req, res, next)=>{
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {page_title: 'Page not found', route_name : ''});
});

sequelize.sync({alter: true}) // Use { force: true } to drop and recreate tables
    .then(() => {
        console.log('Database synced successfully');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });


