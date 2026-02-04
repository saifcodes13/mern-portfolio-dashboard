import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Undo2 } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#0a0a0a] ">
        <div className="bg-[#0a0a0a] pt-3 pl-3">
          <Link to={"/"}>
            <Undo2 color="white" />
          </Link>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#111111] p-8 rounded-xl border border-purple-500/20 space-y-6"
        >
          <h1 className="text-3xl font-bold text-white text-center">
            Admin Login
          </h1>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] text-white px-4 py-3 rounded-md border border-purple-500/20 focus:border-purple-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] text-white px-4 py-3 rounded-md border border-purple-500/20 focus:border-purple-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
