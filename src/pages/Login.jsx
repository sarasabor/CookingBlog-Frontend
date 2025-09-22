import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function Login() {
const { login } = useAuth();
const { t, i18n } = useTranslation("login");
const navigate = useNavigate();

const [form, setForm] = useState({ email: "", password: "" });
const [error, setError] = useState("");

const handleChange = (e) => {
setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
try {
  await login(form);
  navigate("/recipes");
} catch (err) {
  setError(err.response?.data?.message || t("error"));
}
};

return (
<div className="min-h-screen bg-[#f8f6ef] flex flex-col items-center justify-center px-4">

  <h1 className="text-2xl font-bold mb-6 text-[#2d4032]">CookingBlog</h1>

  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
  >
    <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
      {t("title")}
    </h2>

    <input
      type="email"
      name="email"
      placeholder={t("email")}
      value={form.email}
      onChange={handleChange}
      className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
      required
    />

    <input
      type="password"
      name="password"
      placeholder={t("password")}
      value={form.password}
      onChange={handleChange}
      className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
      required
    />

    {error && (
      <p className="text-red-500 text-sm mb-4 text-center">{t("error")}</p>
    )}

    <button
      type="submit"
      className="w-full btn-primary"
    >
      {t("submit")}
    </button>

    <p className="text-sm text-center mt-4">
      {t("noAccount")}{" "}
      <Link to="/register" className="text-[#567158] hover:underline">
        {t("registerLink")}
      </Link>
    </p>
  </form>
</div>
);
}

export default Login;

