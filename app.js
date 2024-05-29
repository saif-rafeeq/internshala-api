require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()
const logger = require("morgan")
const Errorhandler = require("./utils/errorHandler")
const { generatederror } = require("./middlewares/Error")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const fileupload = require("express-fileupload")
const cors = require("cors")
const MongoStore = require("connect-mongo");


// app.use(cors({credentials:true,origin:true}))
app.use(cors({credentials:true,origin:"http://localhost:5173"}))


// body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// session and cookie

const store = MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
    crypto:{
        secret:process.env.SEESION_SECRET
    },
    touchAfter:24*3600
})

app.use(session({
    store:store,
    resave:true,
    saveUninitialized:true,
    secret:process.env.SEESION_SECRET
}))

store.on("error",()=>{
    console.log("error in mongostore",err)
})

app.use(cookieparser())

// express-fileupload
app.use(fileupload())

//dbconnection 
// const { connectDatabase } = require("./models/dataBase")
// connectDatabase()
require("./models/dataBase").connectDatabase()

//logger
app.use(logger("tiny"))


// routes
app.use('/', require("./routes/indexRoutes"))

app.use('/resume', require("./routes/resumeRoutes"))

app.use('/employe', require("./routes/employeRoutes"))


// wildcard route
app.all("*",(req,res,next)=>{
next(new Errorhandler(`Requested URL not found ${req.url}`,404))
})

//custom error handlermiddleware
app.use(generatederror)

app.listen(process.env.PORT, console.log(`server connected on port ${process.env.PORT}`))