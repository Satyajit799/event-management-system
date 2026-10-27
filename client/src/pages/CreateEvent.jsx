import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Event Created");

      navigate("/events");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
