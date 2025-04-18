const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

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
})

app.listen(3000);
