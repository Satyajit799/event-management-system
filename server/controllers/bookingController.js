const Booking = require("../models/Booking");
const Event = require("../models/Event");


const createBooking = async (req, res) => {
    try {

        const event = await Event.findById(req.body.eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        const existingBooking = await Booking.findOne({
            user: req.user._id,
            event: req.body.eventId,
            status: "confirmed",
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "You have already booked this event",
            });
        }

        if (event.bookedSeats >= event.capacity) {
            return res.status(400).json({
                message: "Event is full",
            });
        }

        const booking = await Booking.create({
            user: req.user._id,
            event: req.body.eventId,
        });

        event.bookedSeats += 1;
        await event.save();

        res.status(201).json(booking);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user._id,
        }).populate("event");

        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking already cancelled"
            });
        }

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        const event = await Event.findById(
            booking.event
        );

        if (event) {
            event.bookedSeats -= 1;
            await event.save();
        }

        if (
            booking.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        booking.status = "cancelled";

        await booking.save();

        res.json({
            message: "Booking cancelled",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createBooking, getMyBookings, cancelBooking
};