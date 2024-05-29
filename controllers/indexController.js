const { catchAsyncError } = require("../middlewares/catchAsyncError")
const studentModel = require("../models/studentModel")
const internshipModel = require("../models/internshipModel")
const jobModel = require("../models/jobModel")
const { sendmail } = require("../utils/Nodemailer")
const { sendToken } = require("../utils/SendToken")
const Errorhandler = require("../utils/errorHandler")
const imagekit = require("../utils/imagekit").initImageKit()
const path = require("path")

exports.homepage = catchAsyncError((req, res, next) => {
    res.json({ message: "Secure homepage !" })
})



exports.currentstudent = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    res.json({ student })
})

exports.studentSignup = catchAsyncError(async (req, res, next) => {
    const student = await new studentModel(req.body).save()
    sendToken(student, 201, res)
})


exports.studentSignin = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec()

    if (!student) {
        return next(new Errorhandler("User Not Found With This Email", 404))
    }

    const isMatch = student.comparepass(req.body.password)

    if (!isMatch) return next(new Errorhandler("Wrong Credentials", 500))

    sendToken(student, 200, res)


})

exports.studentSignOut = catchAsyncError(async (req, res, next) => {
    // const student = await new studentModel(req.body).save()
    res.clearCookie("token")
    res.status(201).json({ message: "Successfully Signout!" })
})

exports.studentSendMail = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).exec()
    if (!student) {
        return next(new Errorhandler("User Not Found With This Email", 404))
    }

    const url = `${req.protocol}://${req.get("host")}/student/forgot-link/${student._id}`

    sendmail(req, res, next, url)

    student.resetPasswordToken = "1"
    await student.save()

})


exports.studentForgotLink = catchAsyncError(async (req, res, next) => {

    const student = await studentModel.findById(req.params.id).exec()

    // console.log(req.params.id)
    // console.log(req.body.password)

    if (!student) {
        return next(new Errorhandler("User Not Found With This Email", 404))
    }

    if (!req.body.password) {
        return next(new Errorhandler("New password is required", 404))
    }

    if (student.resetPasswordToken == "1") {
        student.password = req.body.password
        student.resetPasswordToken = "0"
        await student.save()
    } else {
        return next(new Errorhandler("Invalid Reset Password Link Send Mail Again !", 500))
    }

    res.status(200).json({ message: "Password has been successfully changed!" })
})

exports.studentResetPassword = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    if (!req.body.password) return next(new Errorhandler("New password is required", 404))
    student.password = req.body.password
    await student.save()
    sendToken(student, 201, res)
})

// .......................................................................................


exports.studentUpdate = catchAsyncError(async (req, res, next) => {
    console.log(req.params.id)
    const student = await studentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec()

    res.status(200).json({
        success: true,
        message: "Student Updated Successfully!",
    })
})


exports.studentAvatar = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.params.id).exec()
    const file = req.files.avatar
    // console.log(file)
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId)
    }

    const {fileId,url} = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    })
    student.avatar = {fileId,url}
    await student.save()

    res.status(200).json({
        success: true,
        message: "Profile updated !",
    })
})




// ................................apply internship.......................


exports.applyinternship = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id)
    const internship = await internshipModel.findById(req.params.internshipid)

    student.internships.push(internship._id)
    internship.students.push(student._id)
    await student.save()
    await internship.save()

    res.status(200).json({ student, internship })

})




// ...............................apply job................................


exports.applyjob = catchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id)
    const job = await jobModel.findById(req.params.jobid)

    student.jobs.push(job._id)
    job.students.push(student._id)
    await student.save()
    await job.save()

    res.status(200).json({ student, job })

})

// ///////////////////////my

exports.studentdelete = catchAsyncError(async (req, res, next) => {
    // await studentModel.findOneAndDelete(req.params.id).exec()
    
    // res.status(200).json({
    //     success: true,
    //     message: "Profile deleted !",
    // })

    try {
        const student = await studentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Remove student from internships and jobs
        await internshipModel.updateMany({ students: student._id }, { $pull: { students: student._id } });
        await jobModel.updateMany({ students: student._id }, { $pull: { students: student._id } });

        // Delete the student
        await studentModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Student account and related data deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting student account", error: err.message });
    }

})