const bcrypt = require('bcrypt');
const User = require('../../model/admin/adminUser.model');
const { validationResult } = require('express-validator/check')

//================ Get signup page=================
exports.getSignup = (req, res) => {
    res.render('pages/signup', {
        pageTitle: "Sign Up",
        errorMessage: "",
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationErrors: []
    })
}
//================ Get login page =================
exports.getLogin = (req, res) => {
    res.render('pages/login', {
        pageTitle: "Sign Up",
        errorMessage: "",
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationErrors: []
    })
}
//================ Create user account=================
exports.signUp = (req, res) => {
    const { username, password, confirmPass } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('pages/signup', {
            pageTitle: "Sign Up",
            errorMessage: errors.array()[0].msg,
            oldInput: {
                username,
                password,
                confirmPass,
            },
            validationErrors: errors.array(0)
        });
    }
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                username: username,
                password: hashedPassword
            });
            return user.save();
        }).then(result = () => {
            if (result) return res.redirect("/")
        }).catch(error => {
            console.log(error)
        })
}
//================ Login User =================
exports.loginuser = async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('pages/login', {
            pageTitle: "Log In",
            errorMessage: errors.array()[0].msg,
            oldInput: {
                username,
                password,
            },
            validationErrors: errors.array(0)
        });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(422).render('pages/login', {
            pageTitle: "Log in",
            errorMessage: "invalid username",
            oldInput: {
                username,
                password,
            },
            validationErrors: []
        })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        req.session.is_loggedIn = true;
        req.session.user = user
        res.redirect('/admin/index');
    }
    return res.status(422).render('pages/login', {
        pageTitle: "Log in",
        errorMessage: "invalid username or password",
        oldInput: {
            username,
            password,
        },
        validationErrors: []
    })
}
//================ Logout user =================
exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect("/")
}