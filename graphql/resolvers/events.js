
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const { transformEvent } = require('./merge.js');
module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(args.eventInput)
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      place: args.eventInput.place,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      imageUrl: args.eventInput.imageUrl,
      creator: req.userId
    });
    console.log(event)
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // const event = await Event.findById(args.eventId);
      const booking = await Booking.deleteMany({event: args.eventId})
      console.log(booking)
      const event = await  Event.deleteOne({ _id: args.eventId });

      return event;
    } catch (err) {
      throw err;
    }
  }
};