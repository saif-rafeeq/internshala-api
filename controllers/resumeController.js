const { catchAsyncError } = require("../middlewares/catchAsyncError")
const studentModel = require("../models/studentModel")
const Errorhandler = require("../utils/errorHandler")
const { v4: uuidv4 } = require("uuid")

exports.resume = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    res.json({ message: "resume", student })
})

// ................................education...................

exports.addeducation = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.education.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "edducation added" })
})


exports.editeducation = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid)
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body }
    await student.save()

    res.json({ message: "edducation updated" })
})


exports.deleteeducation = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filterededucation = student.resume.education.filter((i) => i.id !== req.params.eduid)
    student.resume.education = filterededucation
    await student.save()

    res.json({ message: "edducation deleted" })
})


// ................................jobs...................

exports.addjobs = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.jobs.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "job added" })
})


exports.editjobs = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const jobIndex = student.resume.jobs.findIndex((i) => i.id === req.params.jobuid)
    student.resume.jobs[jobIndex] = { ...student.resume.jobs[jobIndex], ...req.body }
    await student.save()

    res.json({ message: "jobs updated" })
})



exports.deletejobs = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filteredjobs = student.resume.jobs.filter((i) => i.id !== req.params.jobuid)
    student.resume.jobs = filteredjobs
    await student.save()

    res.json({ message: "job deleted" })
})


// ........................................internship........................


exports.addinternship = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.internship.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "internship added" })
})




exports.editinternship = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const internIndex = student.resume.internship.findIndex((i) => i.id === req.params.internuid)
    student.resume.internship[internIndex] = { ...student.resume.internship[internIndex], ...req.body }
    await student.save()

    res.json({ message: "internship updated" })
})



exports.deleteinternship = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filteredintern = student.resume.internship.filter((i) => i.id !== req.params.internuid)
    student.resume.internship = filteredintern
    await student.save()

    res.json({ message: "internship deleted" })
})



// .................................................responsibilities.....................


exports.addresponsibilities = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "responsibilities added" })
})




exports.editresponsibilities = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const respoIndex = student.resume.responsibilities.findIndex((i) => i.id === req.params.responnuid)
    student.resume.responsibilities[respoIndex] = { ...student.resume.responsibilities[respoIndex], ...req.body }
    await student.save()

    res.json({ message: "responsibilities updated" })
})



exports.deleteresponsibilities = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filteredrespo = student.resume.responsibilities.filter((i) => i.id !== req.params.responnuid)
    student.resume.responsibilities = filteredrespo
    await student.save()

    res.json({ message: "responsibilities deleted" })
})


// ...........................................................courses...................

exports.addcourses = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.courses.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "courses added" })
})




exports.editcourses = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const coursesIndex = student.resume.courses.findIndex((i) => i.id === req.params.coursesuid)
    student.resume.courses[coursesIndex] = { ...student.resume.courses[coursesIndex], ...req.body }
    await student.save()

    res.json({ message: "courses updated" })
})



exports.deletecourses = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filteredcourses = student.resume.courses.filter((i) => i.id !== req.params.coursesuid)
    student.resume.courses = filteredcourses
    await student.save()

    res.json({ message: "courses deleted" })
})


// ...............................................projects........................


exports.addprojects = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.projects.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "projects added" })
})




exports.editprojects = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const projectsIndex = student.resume.projects.findIndex((i) => i.id === req.params.projectsuid)
    student.resume.projects[projectsIndex] = { ...student.resume.projects[projectsIndex], ...req.body }
    await student.save()

    res.json({ message: "projects updated" })
})



exports.deleteprojects = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filteredprojects = student.resume.projects.filter((i) => i.id !== req.params.projectsuid)
    student.resume.projects = filteredprojects
    await student.save()

    res.json({ message: "projects deleted" })
})



// ............................................skills.................................


exports.addskills = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.skills.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "skills added" })
})




exports.editskills = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const skillsIndex = student.resume.skills.findIndex((i) => i.id === req.params.skillsuid)
    student.resume.skills[skillsIndex] = { ...student.resume.skills[skillsIndex], ...req.body }
    await student.save()

    res.json({ message: "skills updated" })
})



exports.deleteskills = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filteredskills = student.resume.skills.filter((i) => i.id !== req.params.skillsuid)
    student.resume.skills = filteredskills
    await student.save()

    res.json({ message: "skills deleted" })
})



// ......................................................accomplishments..........................


exports.addaccomplishments = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() })
    await student.save()
    res.json({ message: "accomplishments added" })
})




exports.editaccomplishments = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const accomplishmentsIndex = student.resume.accomplishments.findIndex((i) => i.id === req.params.accompuid)
    student.resume.accomplishments[accomplishmentsIndex] = { ...student.resume.accomplishments[accomplishmentsIndex], ...req.body }
    await student.save()

    res.json({ message: "accomplishments updated" })
})



exports.deleteaccomplishments = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const filteredaccomplishments = student.resume.accomplishments.filter((i) => i.id !== req.params.accompuid)
    student.resume.accomplishments = filteredaccomplishments
    await student.save()

    res.json({ message: "accomplishments deleted" })
})

