import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";
import EventCard from './../components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await api.get("/events");

    setEvents(res.data);
  };

  const handleBook = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/bookings",
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Successful");

      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search events..."
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="max-w-6xl py-10 grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} handleBook={handleBook} />
        ))}
      </div>
    </>
  );
};

export default Events;
