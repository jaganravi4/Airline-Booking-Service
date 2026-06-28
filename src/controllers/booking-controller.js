const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            message: "Successfully created a booking",
            error: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            error: error,
        });
    }
};

module.exports = {
    create,
};
