const Event = require("../models/Event");

const createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            capacity: req.body.capacity,
            createdBy: req.user._id,
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("createdBy", "name email");

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    createEvent, getEvents, getEventById, updateEvent,
    deleteEvent,
};