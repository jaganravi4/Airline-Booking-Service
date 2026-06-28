const { Booking } = require("../models/index");
const { ValidationError, ServerError } = require("../utils/errors/errors");

class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error.messages);
            }
            throw ServerError("Cannot Create Booking");
        }
    }
}

module.exports = BookingRepository;
