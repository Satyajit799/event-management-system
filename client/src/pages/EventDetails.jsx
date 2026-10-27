import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBook = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/bookings",
        { eventId: event._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Successful");

      fetchEvent();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (!event) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">{event.title}</h1>

        <p className="mt-4 text-gray-600">{event.description}</p>

        <div className="mt-6 space-y-2">
          <p>📍 {event.location}</p>

          <p>
            📅{" "}
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p>
            👥 {event.bookedSeats}/{event.capacity}
          </p>
        </div>

        <button
          onClick={handleBook}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Book Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
