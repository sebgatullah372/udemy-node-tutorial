const express = require('express');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

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

app.use('/add-product', (req, res, next)=> {
    res.send('<form action="/product" method="POST"><input type="text" name="product"/><button type="submit">Add</button></form>');
});
app.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});
app.use('/', (req, res, next) => {
    res.send('<h1>Express Home Page</h1>')
});


app.listen(3000);