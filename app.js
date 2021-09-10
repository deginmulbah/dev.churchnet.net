require('dotenv').config({
    path: `./env-files/${'development'}.env`,
});
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
const fileupload = require('express-fileupload')
const app = express();

const port = process.env.PORT
const mongoUri = process.env.DATABASE_URL;
const staticFolder = process.env.NODE_ENV === "development" ? "public" : "dist";
const oneDay = 1000 * 60 * 60 * 24;

// app.use(compression());
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
const departmennt = require('./routes/admin/department.routes');
const member = require('./routes/admin/member.routes');
const communication = require('./routes/admin/comm.routes');
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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, staticFolder)));
app.use(fileupload({ useTempFiles: true }));
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
app.use('/admin', adminDashboard);
app.use('/admin/member', member);
app.use('/admin/user', userRoutes); 
app.use('/admin/profile', Userprofile);
app.use('/admin/general_setup', generalSetup);
app.use('/admin/department', departmennt);
app.use('/admin/communication', communication);
//404 error page
app.use((req, res) => {
    res.status(404).render('pages/404');
});
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})