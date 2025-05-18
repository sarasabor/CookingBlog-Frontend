import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const isPasswordStrong = (password) => {
   
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
      password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (inputs.password !== inputs.confirmPassword) {
      return setError(" passwords not identical");
    }

    if (!isPasswordStrong(inputs.password)) {
      return setError(
        "Password is weak. Her testicle is at least 6 letters, has a number, a large letter or a symbol"
      );
    }

    try {
      await api.post("/auth/register", {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          🍽️ Create Account
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={inputs.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={inputs.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

