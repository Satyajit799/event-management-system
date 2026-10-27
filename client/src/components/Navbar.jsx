import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">EventHub</h1>

      <div className="flex gap-6">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-white"
          }
        >
          Events
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-white"
          }
        >
          My Bookings
        </NavLink>

        <NavLink to="/create-event">Create Event</NavLink>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
