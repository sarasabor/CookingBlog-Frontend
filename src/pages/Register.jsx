import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function Register() {
  const { register } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError(t("errors.passwordMatch"));
      return;
    }

    if (form.password.length < 6) {
      setError(t("errors.passwordLength"));
      return;
    }

    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || t("errors.registration"));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6ef] flex flex-col items-center justify-center px-4">
      <div className="absolute top-4 right-4 space-x-2">
        <button onClick={() => i18n.changeLanguage("en")} className="text-sm hover:underline">EN</button>
        <button onClick={() => i18n.changeLanguage("fr")} className="text-sm hover:underline">FR</button>
        <button onClick={() => i18n.changeLanguage("ar")} className="text-sm hover:underline">AR</button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-[#2d4032]">CookingBlog</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          {t("register.title")}
        </h2>

        <input
          type="text"
          name="username"
          placeholder={t("register.username")}
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <input
          type="email"
          name="email"
          placeholder={t("register.email")}
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder={t("register.password")}
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder={t("register.confirm")}
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#567158] text-white py-2 rounded-lg hover:bg-[#3f5744] transition"
        >
          {t("register.submit")}
        </button>

        <p className="text-sm text-center mt-4">
          {t("register.already")}{" "}
          <Link to="/login" className="text-[#567158] hover:underline">
            {t("register.loginLink")}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
