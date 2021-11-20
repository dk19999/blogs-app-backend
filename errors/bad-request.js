const CustomAPIErrorClass = require("./custom-error");
const {StatusCodes} = require('http-status-codes')

class BadRequestError extends CustomAPIErrorClass{
    constructor(message, statusCode){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError