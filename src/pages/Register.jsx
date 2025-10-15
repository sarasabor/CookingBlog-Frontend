import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

function Register() {
const { register } = useAuth();
const navigate = useNavigate();
const { t, i18n } = useTranslation("register");

const [form, setForm] = useState({
username: "",
email: "",
password: "",
confirm: "",
});

const [error, setError] = useState("");

const handleChange = (e) => {
const { name, value } = e.target;
setForm((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
if (form.password.length < 6) {
  return setError(t("errors.passwordLength"));
}
if (form.password !== form.confirm) {
  return setError(t("errors.passwordMatch"));
}

try {
  const result = await register(form.username, form.email, form.password);
  if (result.success) {
    navigate("/login");
  } else {
    setError(result.error || t("errors.registration"));
  }
} catch (err) {
  setError(err.response?.data?.message || t("errors.registration"));
}
};

return (
<div className="min-h-screen bg-[#f8f6ef] flex flex-col items-center justify-center px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
  >
    <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
      {t("title")}
    </h2>

    <input
      type="text"
      name="username"
      placeholder={t("username")}
      value={form.username}
      onChange={handleChange}
      className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
      required
    />

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

    <input
      type="password"
      name="confirm"
      placeholder={t("confirm")}
      value={form.confirm}
      onChange={handleChange}
      className="w-full mb-4 p-3 border rounded-lg bg-[#fdfcf8]"
      required
    />

    {error && (
      <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
    )}

    <button
      type="submit"
      className="w-full btn-primary"
    >
      {t("submit")}
    </button>

    <p className="text-sm text-center mt-4">
      {t("already")}{" "}
      <Link to="/login" className="text-[#567158] hover:underline">
        {t("loginLink")}
      </Link>
    </p>
  </form>
</div>
);
}

export default Register;