const { catchAsyncError } = require("../middlewares/catchAsyncError")
const employeModel = require("../models/employeModel")
const internshipModel = require("../models/internshipModel")
const jobModel = require("../models/jobModel")
const { sendmail } = require("../utils/Nodemailer")
const { sendTokenEmploye } = require("../utils/SendToken")
const Errorhandler = require("../utils/errorHandler")
const imagekit = require("../utils/imagekit").initImageKit()
const path = require("path")

exports.homepage = catchAsyncError((req, res, next) => {
    res.json({ message: "Secure homepage !" })
})



exports.currentemploye = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findById(req.id).exec()
    res.json({ employe })
})

exports.employeSignup = catchAsyncError(async (req, res, next) => {
    const employe = await new employeModel(req.body).save()
    sendTokenEmploye(employe, 201, res)
})


exports.employeSignin = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ email: req.body.email }).select("+password").exec()

    if (!employe) {
        return next(new Errorhandler("User Not Found With This Email", 404))
    }

    const isMatch = employe.comparepass(req.body.password)

    if (!isMatch) return next(new Errorhandler("Wrong Credentials", 500))

    sendTokenEmploye(employe, 200, res)


})

exports.employeSignOut = catchAsyncError(async (req, res, next) => {
    // const employe = await new employeModel(req.body).save()
    res.clearCookie("token")
    res.status(201).json({ message: "Successfully Signout!" })
})

exports.employeSendMail = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ email: req.body.email }).exec()

    if (!employe) {
        return next(new Errorhandler("User Not Found With This Email", 404))
    }

    const url = `${req.protocol}://${req.get("host")}/employe/forgot-link/${employe._id}`

    sendmail(req, res, next, url)

    employe.resetPasswordToken = "1"
    await employe.save()

})


exports.employeForgotLink = catchAsyncError(async (req, res, next) => {

    const employe = await employeModel.findById(req.params.id).exec()

    if (!employe) {
        return next(new Errorhandler("User Not Found With This Email", 404))
    }

    if (!req.body.password) {
        return next(new Errorhandler("New password is required", 404))
    }

    if (employe.resetPasswordToken == "1") {
        employe.password = req.body.password
        employe.resetPasswordToken = "0"
        await employe.save()
    } else {
        return next(new Errorhandler("Invalid Reset Password Link Send Mail Again !", 500))
    }

    res.status(200).json({ message: "Password has been successfully changed!" })
})

exports.employeResetPassword = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findById(req.id).exec()
    if (!req.body.password) return next(new Errorhandler("New password is required", 404))
    employe.password = req.body.password
    await employe.save()
    sendTokenEmploye(employe, 201, res)
})

// // .......................................................................................


exports.employeUpdate = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec()

    res.status(200).json({
        success: true,
        message: "employe Updated Successfully!",
        // employe
    })
})


exports.employeorganizationlogo = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findById(req.params.id).exec()
    const file = req.files.organizationlogo
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

    if (employe.organizationlogo.fileId !== "") {
        await imagekit.deleteFile(employe.organizationlogo.fileId)
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    })
    employe.organizationlogo = { fileId, url }
    await employe.save()

    res.status(200).json({
        success: true,
        message: "Profile updated !",
    })
})


// ......................................create internship..............


exports.createinternship = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findById(req.id).exec()
    const internship = await new internshipModel(req.body)
    internship.employe = employe._id
    employe.internships.push(internship._id)
    await internship.save()
    await employe.save()
    res.status(201).json({ success: true, internship })
})


exports.readinternship = catchAsyncError(async (req, res, next) => {
    const { internships } = await employeModel.findById(req.id).populate("internships").exec()
    res.status(200).json({ success: true, internships })
})

// ...................................my


exports.readinternshipall = catchAsyncError(async (req, res, next) => {
    const internship = await internshipModel.find({}).exec()
    res.status(200).json({ success: true, internship })
})


exports.readsingleinternship = catchAsyncError(async (req, res, next) => {
    const internship = await internshipModel.findById(req.params.id).exec()
    res.status(200).json({ success: true, internship })
})

// ......................my

exports.readinternstudents = catchAsyncError(async (req, res, next) => {
    const internship = await internshipModel.findById(req.params.id).populate("students").exec()
    res.status(200).json({ success: true, internship })
})


// ......................................create job..............


exports.createjob = catchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findById(req.id).exec()
    const job = await new jobModel(req.body)
    job.employe = employe._id
    employe.jobs.push(job._id)
    await job.save()
    await employe.save()
    res.status(201).json({ success: true, job })
})


exports.readjob = catchAsyncError(async (req, res, next) => {
    const { jobs } = await employeModel.findById(req.id).populate("jobs").exec()
    res.status(200).json({ success: true, jobs })
})



exports.readsinglejob = catchAsyncError(async (req, res, next) => {
    const job = await jobModel.findById(req.params.id).exec()
    res.status(200).json({ success: true, job })
})


// .........................my

exports.readjoball = catchAsyncError(async (req, res, next) => {
    const job = await jobModel.find({}).exec()
    res.status(200).json({ success: true, job })
})

// ......................my

exports.readjobstudents = catchAsyncError(async (req, res, next) => {
    const job = await jobModel.findById(req.params.id).populate("students").exec()
    res.status(200).json({ success: true, job })
})


exports.employedelete = catchAsyncError(async (req, res, next) => {
    // await studentModel.findOneAndDelete(req.params.id).exec()

    // res.status(200).json({
    //     success: true,
    //     message: "Profile deleted !",
    // })
    try {
        const employe = await employeModel.findById(req.params.id);
        if (!employe) {
            return res.status(404).json({ message: "Employe not found" });
        }

        // Delete related internships and jobs
        await internshipModel.deleteMany({ employe: employe._id });
        await jobModel.deleteMany({ employe: employe._id });

        // Delete the employe
        await employeModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Employe account and related data deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting employe account", error: err.message });
    }

})



exports.interndelete = catchAsyncError(async (req, res, next) => {
    // await studentModel.findOneAndDelete(req.params.id).exec()

    // res.status(200).json({
    //     success: true,
    //     message: "Profile deleted !",
    // })
    const intern = await internshipModel.findById(req.params.id);
    if (!intern) {
        return res.status(404).json({ message: "Internship not found" });
    }
    // Delete the employe
    await internshipModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Internship deleted !",
    })

})


exports.jobdelete = catchAsyncError(async (req, res, next) => {
    // await studentModel.findOneAndDelete(req.params.id).exec()

    // res.status(200).json({
    //     success: true,
    //     message: "Profile deleted !",
    // })
    const job = await jobModel.findById(req.params.id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }
    // Delete the employe
    await jobModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Job deleted !",
    })

})