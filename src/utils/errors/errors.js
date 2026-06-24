const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ClientError extends AppError {
    constructor(message = "Bad Request") {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

class ServerError extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    AppError,
    ClientError,
    ValidationError,
    ServerError,
};
