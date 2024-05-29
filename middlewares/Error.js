exports.generatederror = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    if (err.name == "MongoServerError" && err.message.includes("E11000 duplicate key")) {
        err.message = 'This email is already exists'
    }
    
    

    res.status(statusCode).json({
        message: err.message,
        errorName: err.name,
        // stack:err.stack
    })
}

