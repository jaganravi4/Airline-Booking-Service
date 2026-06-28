const axios = require("axios");

const { BookingRepository } = require("../repositories/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { ServerError } = require("../utils/errors/errors");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async create(data) {
        try {
            const flightId = data.flightId;
            const getFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightUrl);
            const flightData = response.data.data;

            const noOfSeats = data.noOfSeats;
            if (noOfSeats > flightData.totalSeats) {
                throw new ServerError(
                    "Something went wrong in the booking process",
                );
            }

            const price = flightData.price;
            const totalCost = price * noOfSeats;

            const bookingPayload = { ...data, totalCost };

            const booking = await this.bookingRepository.create(bookingPayload);

            const updateFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.dataValues.flightId}`;
            await axios.patch(updateFlightUrl, {
                totalSeats:
                    flightData.totalSeats - booking.dataValues.noOfSeats,
            });

            const finalBooking = await this.bookingRepository.update(
                booking.id,
                {
                    status: "BOOKED",
                },
            );

            return finalBooking;
        } catch (error) {
            console.log(error);
            if (error.name == "ValidationError") {
                throw error;
            }
            throw new ServerError();
        }
    }
}

module.exports = BookingService;
