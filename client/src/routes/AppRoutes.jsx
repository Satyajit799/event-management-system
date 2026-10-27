import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import MyBookings from "../pages/MyBookings";
import Dashboard from "../pages/Dashboard";
import CreateEvent from "../pages/CreateEvent";
import EventDetails from "../pages/EventDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/events" element={<Events />} />

        <Route path="/bookings" element={<MyBookings />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/create-event" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
