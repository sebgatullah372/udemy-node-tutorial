const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);