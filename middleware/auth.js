module.exports = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.session.isLoggedIn) {
        // If not authenticated, redirect to the login page
        return res.redirect('/login');
    }
    
    // If authenticated, proceed to the next middleware or route handler
    next();
}