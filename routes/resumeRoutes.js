const express = require("express")
const router = express.Router()
const {resume,addeducation,editeducation,deleteeducation,addjobs,editjobs,deletejobs,addinternship,editinternship,deleteinternship,addresponsibilities,editresponsibilities,deleteresponsibilities,addcourses,editcourses,deletecourses,addprojects,editprojects,deleteprojects,addskills,editskills,deleteskills,addaccomplishments,editaccomplishments,deleteaccomplishments} = require("../controllers/resumeController")
const { isAuthenticated } = require("../middlewares/auth")

// get /
router.get('/',isAuthenticated,resume)

// ................................education...................

// post /
router.post('/add-edu',isAuthenticated,addeducation)

// post /
router.post('/edit-edu/:eduid',isAuthenticated,editeducation)


// post /
router.post('/delete-edu/:eduid',isAuthenticated,deleteeducation)

// ................................jobs...................


// post /
router.post('/add-jobs',isAuthenticated,addjobs)

// post /
router.post('/edit-jobs/:jobuid',isAuthenticated,editjobs)


// post /
router.post('/delete-jobs/:jobuid',isAuthenticated,deletejobs)


// ........................................internship........................


// post /
router.post('/add-intern',isAuthenticated,addinternship)

// post /
router.post('/edit-intern/:internuid',isAuthenticated,editinternship)


// post /
router.post('/delete-intern/:internuid',isAuthenticated,deleteinternship)


//................................................responsibilities...................


// post /
router.post('/add-respon',isAuthenticated,addresponsibilities)

// post /
router.post('/edit-respon/:responnuid',isAuthenticated,editresponsibilities)


// post /
router.post('/delete-respon/:responnuid',isAuthenticated,deleteresponsibilities)


// ...........................................................courses...................

    // isko mene react me use nhi kiya ..........
    
// post /
router.post('/add-courses',isAuthenticated,addcourses)

// post /
router.post('/edit-courses/:coursesuid',isAuthenticated,editcourses)


// post /
router.post('/delete-courses/:coursesuid',isAuthenticated,deletecourses)


// ...............................................projects........................


// post /
router.post('/add-projects',isAuthenticated,addprojects)

// post /
router.post('/edit-projects/:projectsuid',isAuthenticated,editprojects)


// post /
router.post('/delete-projects/:projectsuid',isAuthenticated,deleteprojects)


// .................................................skills...........................

// post /
router.post('/add-skills',isAuthenticated,addskills)

// post /
router.post('/edit-skills/:skillsuid',isAuthenticated,editskills)


// post /
router.post('/delete-skills/:skillsuid',isAuthenticated,deleteskills)


// ......................................................accomplishments..........................


// post /
router.post('/add-accomplishments',isAuthenticated,addaccomplishments)

// post /
router.post('/edit-accomplishments/:accompuid',isAuthenticated,editaccomplishments)


// post /
router.post('/delete-accomplishments/:accompuid',isAuthenticated,deleteaccomplishments)







module.exports = router