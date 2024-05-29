exports.sendToken = function (student, statusCode, res) {
    const token = student.getjwttoken()

    const option = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure:true,
        sameSite:"none"
    }

    res.status(statusCode).cookie("token",token,option).json({success:true, id:student._id,token})

}

exports.sendTokenEmploye = function (employe, statusCode, res) {
    const token = employe.getjwttoken()

    const option = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure:true,
        sameSite:"none"
    }

    res.status(statusCode).cookie("token",token,option).json({success:true, id:employe._id,token})

}