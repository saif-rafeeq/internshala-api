const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
        minLength: [2, "First name should be atleast 2 character long"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [2, "Last name should be atleast 2 character long"]
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
        maxLength: [10, "Contact must not exceed 10 number"],
        minLength: [10, "Contact should be atleast 10 number long"]
    },
    city: {
        type: String,
        required: [true, "City name is required"],
        minLength: [3, "City should be atleast 3 character long"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        required:[true,"Gender is required"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email Is Required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, 'Password should not exceed more than 15 characters'],
        minLength: [6, 'Password should have atleast 6 characters'],
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, 'Please fill special, Number/Capital in password']
    },
    resetPasswordToken: {
        type: String,
        default: "0"
    },
    avatar:{
        type:Object,
        default:{
            fileId:"",
            url:"https://static.wikia.nocookie.net/beyond-the-storm/images/2/2e/DefaultCharacter.jpg/revision/latest?cb=20210707143024"
        }
    },
    resume:{
        education:[],
        jobs:[],
        internship:[],
        responsibilities:[],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[]
    },
    internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],

}, { timestamps: true })


studentSchema.pre("save", function () {

    if (!this.isModified("password")) return

    let salt = bcrypt.genSaltSync(15)
    this.password = bcrypt.hashSync(this.password, salt)

})


studentSchema.methods.comparepass = function (password) {
    return bcrypt.compareSync(password, this.password);
}


studentSchema.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}



module.exports = mongoose.model("student", studentSchema)

