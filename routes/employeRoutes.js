const express = require("express")
const router = express.Router()
const { homepage,
    currentemploye,
    employeSignup,
    employeSignin,
    employeSignOut,
    employeSendMail,
    employeForgotLink,
    employeResetPassword,
    employeUpdate,
    employeorganizationlogo,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
    readinternshipall,
    readjoball,
    readinternstudents,
    readjobstudents,
    employedelete,
    interndelete,
    jobdelete
} = require("../controllers/employeControllers")
const { isAuthenticated } = require("../middlewares/auth")

// get /
router.get('/', isAuthenticated, homepage)

// post /employe
router.post('/current', isAuthenticated, currentemploye)

// post /signup
router.post('/signup', employeSignup)


// post /signin
router.post('/signin', employeSignin)


// // get /signOut
router.get('/signout', isAuthenticated, employeSignOut)


// // post /sendmail
router.post('/sendmail', employeSendMail)


// // get /forgot-link/:id ----bhaiya ne 
router.post('/forgot-link/:id', employeForgotLink)

// // post /reset-password/:id 
router.post('/reset-password/:id', isAuthenticated, employeResetPassword)


// // -------------------------------------------------------------------------------


// // post /update/:id 
router.post('/update/:id', isAuthenticated, employeUpdate)


// // post /organizationlogo/:id 
router.post('/organizationlogo/:id', isAuthenticated, employeorganizationlogo)



// ........................create internship............................


// // post /internship/create 
router.post('/internship/create', isAuthenticated, createinternship)


// // post /internship/read 
router.get('/internship/read', isAuthenticated, readinternship)


// // post /internship/read/:id 
router.get('/internship/read/:id', isAuthenticated, readsingleinternship)

// .........................my

router.get('/internship/readall', readinternshipall)


// ..........................my
router.get('/internship/read/student/:id', isAuthenticated, readinternstudents)



// ........................create job............................


// // post /job/create 
router.post('/job/create', isAuthenticated, createjob)


// // post /job/read 
router.get('/job/read', isAuthenticated, readjob)

// .............................my

router.get('/job/readall', readjoball)

// ..........................my
router.get('/job/read/student/:id', isAuthenticated, readjobstudents)



// // post /job/read/:id 
router.get('/job/read/:id', isAuthenticated, readsinglejob)




// .............................my


router.post('/delete/:id',isAuthenticated,employedelete)


router.post('/delete/intern/:id',isAuthenticated,interndelete)


router.post('/delete/job/:id',isAuthenticated,jobdelete)







module.exports = router