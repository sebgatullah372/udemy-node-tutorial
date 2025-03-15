const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('First Middleware');
    next();
});

app.use((req, res, next) => {
    console.log('Second Middleware');
    next();
});

app.use('/users', (req, res, next) => {
    res.send('<h1>Express Users Page</h1>')
});

app.use('/', (req, res, next) => {
    res.send('<h1>Express Home Page</h1>')
});


app.listen(3000);