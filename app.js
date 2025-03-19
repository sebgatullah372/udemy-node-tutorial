const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // /admin is the route prefix
app.use(shopRoutes);

app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);