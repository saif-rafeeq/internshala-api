const nodemailer = require("nodemailer")
const Errorhandler = require("./errorHandler")

exports.sendmail = (req,res,next,url) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOption = {
        from: "saif rafeeq company pvt.ltd",
        to: req.body.email,
        subject: "Password Reset Link",
        text: "Do not share this link to anyone",
        html: `<h1>Click link blow to reset password</h1>
        <a href="${url}">Password Reset Link</a>`
    }

    transport.sendMail(mailOption, async (err, info) => {
        if (err) return next(new Errorhandler(err, 500))

        return res.status(200).json({ message: "mail sent successfully", url })
    })

}