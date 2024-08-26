const express = require('express')
const AdminController = require('../Controllers/AdminController')
const UserController = require('../Controllers/UserController')
const RegistrationController = require('../Controllers/RegistrationController')
const auth = require("../Middleware/auth")
const islogin = require("../Middleware/islogin")
const BidController = require('../Controllers/BidController')

const route = express.Router()



//Registration and login
route.get('/registration',RegistrationController.registration)
route.get('/login',islogin,RegistrationController.login)
route.post('/registrationinsert',RegistrationController.insert)
route.post("/loginverify",RegistrationController.loginVerify)
route.get('/logout',auth,RegistrationController.logout)

//Admin panel
route.get('/',AdminController.Home)
route.get('/admin/dashboard',auth,AdminController.Dashboard)
route.get('/admin/bid',auth,AdminController.bid)
route.post("/bidInsert",auth,AdminController.Bidinsert)
route.get('/biddata/display',auth,AdminController.biddisplay)
route.get('/edit/:id',auth,AdminController.edit)
route.post('/update/:id',auth,AdminController.update)
route.get('/delete/:id',auth,AdminController.delete)
route.post('/close/:id',auth,AdminController.close)

//user panel
route.get('/userdashboard',auth,BidController.UserDashboard)
route.get('/price/:id',auth,BidController.Price)
route.post('/enterprice/:id',auth,BidController.PriceEnter)


module.exports = route