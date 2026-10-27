import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from './../components/StatCard';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    activeBookings: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [eventsRes, bookingsRes] = await Promise.all([
        api.get("/events"),
        api.get("/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const bookings = bookingsRes.data;

      setStats({
        totalEvents: eventsRes.data.length,
        totalBookings: bookings.length,
        activeBookings: bookings.filter(
          (booking) => booking.status === "confirmed",
        ).length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Events" value={stats.totalEvents} />

        <StatCard title="My Bookings" value={stats.totalBookings} />

        <StatCard title="Active Bookings" value={stats.activeBookings} />
      </div>
    </div>
  );
};

export default Dashboard;
