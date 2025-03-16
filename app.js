const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes); // /admin is the route prefix
app.use(shopRoutes);

app.use((req, res, next)=>{
    res.status(404).send('<h1>404 Page not found</h1>');
})

app.listen(3000);