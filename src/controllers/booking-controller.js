const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");
const {createChannel, publishMessage} = require("../utils/messageQueue");
const {REMINDER_BINDING_KEY} = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {

    async sendMessageToQueue(req, res) {
        try{
            const channel = await createChannel();
            const data = {message: "SUCCESS"};
            await publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
            return res.status(200).json({
                message: "Successfully published message",
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                data: {},
                success: false,
                message: "Something went wrong",
                error: error
            });
        }
    }

    async create(req, res) {
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
    }
}

module.exports = BookingController;
