require('dotenv').config();
const path = require('path');
const helmet = require("helmet"); 
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const compression = require('compression');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const flashMessageMiddleware = require('./middleware/flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const is_auth = require('./middleware/is_auth');
const app = express();
const mongoUri = process.env.DATABASE_URL;
// const staticFolder = process.env.NODE_ENV === "development" ? "public" : "dist";
const oneDay = 1000 * 60 * 60 * 24;
app.use(compression());
// db connection
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
// controller routes   
const admin_auth = require('./routes/admin/admin_auth.routes');
const adminDashboard = require('./routes/admin/adminDashboard.routes');
const userRoutes = require('./routes/admin/user.routes');
const Userprofile = require('./routes/admin/profile.routes');
const generalSetup = require('./routes/admin/general_setup.routes');
const group = require('./routes/admin/group.routes');
const member = require('./routes/admin/member.routes');
const visitor = require('./routes/admin/visitor.routes');
const communication = require('./routes/admin/comm.routes');
const dashboard = require('./routes/admin/dashboard.routes');
const fundraise = require('./routes/admin/fundraise.routes');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// middlewares 
app.use(
    helmet({
        contentSecurityPolicy: false,       
    })
); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
const store = MongoDBStore({
    uri: mongoUri,
    collection: "userSession"
})
app.use(session({
    secret: process.env.SECTRT,
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie:{ 
    //     expires:oneDay,
    //     secure: true
    // }
}));
app.use(flash());
app.use(flashMessageMiddleware.flashMessage);
// app routes  
app.use(admin_auth);
app.use('/admin', is_auth, adminDashboard);
app.use('/admin/member',is_auth, member);
app.use('/admin/group',is_auth, group);
app.use('/admin/user',is_auth, userRoutes); 
app.use('/admin/profile',is_auth, Userprofile);
app.use('/admin/general_setup',is_auth, generalSetup);
app.use('/admin/communication',is_auth, communication);
app.use('/admin/visitor',is_auth, visitor);
app.use('/admin/fundraising',is_auth, fundraise);
app.use('/admin/dashboard',is_auth, dashboard);
//404 error page
app.use((req, res) => {
    res.status(404).render('pages/404');
});
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})