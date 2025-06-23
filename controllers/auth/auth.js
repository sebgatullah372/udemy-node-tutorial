const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const errorHandler = require('../../utils/error-handler');
exports.showLoginForm = (req, res, next) => {
    res.render('auth/login', {
        page_title: 'Login',
        route_name: 'auth.login'
    });
}

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email).then(user => {
        if (!user) {
            console.log('User not found with this email:', email);
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
                console.log('Invalid password for user:', email);
                return res.redirect('/login');
            }
            // Set up Session
            req.session.isLoggedIn = true;
            req.session.user = user; // Store user in session
            console.log('User logged in successfully:', user.name);
            req.session.save(err => {
                if (err) {
                    console.error('Error saving session:', err);
                    return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
                }
                return res.redirect('/'); // Redirect to home page or dashboard
            });
            
        }).catch(err => {
            console.error('Error comparing passwords:', err);
            errorHandler.handle500Error(err, req, res, next);
        });
    }).catch(err => {
        console.error('Error finding user:', err);
        errorHandler.handle500Error(err, req, res, next);
    });
}

exports.showRegisterForm = (req, res) => {
    res.render('auth/register', {
        page_title: 'Register',
        route_name: 'auth.register'
    });
}
exports.registerUser = (req, res) => {
    const { name, email, password , confirm_password} = req.body;
    User.findByEmail(email).then(user => {
        if(user){
            console.log('User already exists with this email:', email);
            return redirect('/register');
        }
        if (password !== confirm_password) {
            console.log('Passwords do not match');
            return res.redirect('/register');
        }
        return bcrypt.hash(password, 12);
       
    }).then(hashedPassword => {
        const newUser = {
                name: name,
                email: email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()  
            };


        User.create(newUser).then(() => {
            console.log('User registered successfully:', name);
            res.redirect('/login');
        }
        ).catch(err => {
           errorHandler.handle500Error(err, req, res, next);
        });
    }).catch(err => {
        errorHandler.handle500Error(err, req, res, next);
    });    
}

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).render('500', { page_title: 'Internal Server Error', route_name: 'error' });
        }
        console.log('User logged out successfully');
        res.redirect('/login'); // Redirect to login page after logout
    });
}