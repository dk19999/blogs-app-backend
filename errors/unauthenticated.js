const CustomAPIErrorClass = require("./custom-error");
const {StatusCodes} = require('http-status-codes')

class UnauthenticatedError extends CustomAPIErrorClass{
    constructor(message, statusCode){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError