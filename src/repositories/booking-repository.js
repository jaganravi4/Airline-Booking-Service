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

    async update(id, data) {
        try {
            const booking = await Booking.findByPk(id);
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error.messages);
            }
            throw ServerError("Cannot update Booking");
        }
    }
}

module.exports = BookingRepository;
