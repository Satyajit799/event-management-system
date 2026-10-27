import { Link } from "react-router-dom";

const EventCard = ({ event, handleBook }) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      p-5
      "
    >
      <Link to={`/events/${event._id}`}>
        <h2 className="text-2xl font-bold">{event.title}</h2>

        <p className="text-gray-600 mt-3">{event.description}</p>

        <p className="mt-3">📍 {event.location}</p>

        <p className="mt-2">
          📅{" "}
          {new Date(event.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="mt-2">
          👥 {event.bookedSeats}/{event.capacity}
        </p>
      </Link>

      <button
        onClick={() => handleBook(event._id)}
        className="
        mt-5
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-2
        rounded-lg
        "
      >
        Book Event
      </button>
    </div>
  );
};

export default EventCard;
