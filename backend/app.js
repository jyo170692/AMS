const express = require('express')
const app = express()
const port = 1000
const web = require('./routes/route.js')
const connectdb = require('./Db/Db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session=require('express-session')
const flash=require('connect-flash')



app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}));
app.use(flash())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.set('view engine','ejs')
//connect Db 
connectdb()
app.use(cookieParser())
app.use(express.json())

//rotuer path
app.use('/',web)



app.listen(port,()=>
    {
        console.log(`server is running ${port}`)
    })