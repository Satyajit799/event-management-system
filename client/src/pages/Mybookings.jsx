import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Cancelled");

      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {bookings.length === 0 ? (
          <div className="col-span-full text-center py-5">
            <h2 className="text-2xl font-semibold">No bookings yet</h2>

            <p className="text-gray-500 mt-2">Book your first event.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-xl p-5"
            >
              <h2 className="text-xl font-semibold">{booking.event?.title}</h2>

              <p className="text-gray-500 mt-2">
                📅{" "}
                {booking.event?.date
                  ? new Date(booking.event.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>

              <p>
                Status:
                <span
                  className={`ml-2 font-medium ${
                    booking.status === "confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              {booking.status === "confirmed" ? (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel Booking
                </button>
              ) : (
                <p className="mt-4 text-red-500 font-medium">
                  Booking Cancelled
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
