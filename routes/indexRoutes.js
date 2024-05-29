const express = require("express")
const router = express.Router()
const {homepage,currentstudent,studentSignup,studentSignin,studentSignOut,studentSendMail,studentForgotLink,studentResetPassword,studentUpdate,studentAvatar,applyinternship,applyjob,studentdelete} = require("../controllers/indexController")
const { isAuthenticated } = require("../middlewares/auth")

// get /
router.get('/',isAuthenticated,homepage)

//post /student
router.post('/student',isAuthenticated,currentstudent)

// post /student/signup
router.post('/student/signup',studentSignup)


// post /student/signin
router.post('/student/signin',studentSignin)


// get /student/signOut
router.get('/student/signout',isAuthenticated,studentSignOut)


// post /student/sendmail
router.post('/student/sendmail',studentSendMail)


// get /student/forgot-link/:id ----bhaiya ne 
router.post('/student/forgot-link/:id',studentForgotLink)

// post /student/reset-password/:id 
router.post('/student/reset-password/:id',isAuthenticated,studentResetPassword)


// -------------------------------------------------------------------------------


// post /student/update/:id 
router.post('/student/update/:id',isAuthenticated,studentUpdate)


// post /student/avatar/:id 
router.post('/student/avatar/:id',isAuthenticated,studentAvatar)


// ...............................................applye internship...............



// post /student/apply/internship/:internshipid 
router.post('/student/apply/internship/:internshipid',isAuthenticated,applyinternship)



// ...............................................applye job...............



// post /student/apply/:jobid 
router.post('/student/apply/job/:jobid',isAuthenticated,applyjob)




// ..............................my

router.post('/student/delete/:id',isAuthenticated,studentdelete)







module.exports = router