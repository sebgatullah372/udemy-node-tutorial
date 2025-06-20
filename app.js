const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./utils/db_connection');
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

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        if (!user) {
            return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
        }
        req.user = user; // Attach user to request object
        next();
    }
).catch(err => {
        console.error('Error fetching user:', err);
        return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
    });
});

app.use('/admin', adminRoutes); // /admin is the route prefix
app.use(shopRoutes);

app.use((req, res, next)=>{
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {page_title: 'Page not found', route_name : ''});
});


sequelize.sync(
    {
    alter: true, 
    // force: true
    }) // Use { force: true } to drop and recreate tables
    .then(result => {
        return User.findByPk(1); // Example to check if a user exists
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: 'Super Admin',
                email: 'admin@myshop.com',
                password: '12345678',
                createdAt: new Date(),
                updatedAt: new Date()    
            })
        }
        return user;
    })
    .then(user => {
        console.log('Database synced successfully and created default user:', user.name);
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });


