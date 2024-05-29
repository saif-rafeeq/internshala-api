exports.sendToken = function (student, statusCode, res) {
    const token = student.getjwttoken()
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE);
    const expirationDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);
    // const option = {
    //     expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure:true,
    //     sameSite:"none"
    // }
    const options = {
        expires: expirationDate,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };

    res.status(statusCode).cookie("token",token,options).json({success:true, id:student._id,token})

}

exports.sendTokenEmploye = function (employe, statusCode, res) {
    const token = employe.getjwttoken()
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE);
    const expirationDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);
    // const option = {
    //     expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure:true,
    //     sameSite:"none"
    // }
    const options = {
        expires: expirationDate,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };

    res.status(statusCode).cookie("token",token,options).json({success:true, id:employe._id,token})

}