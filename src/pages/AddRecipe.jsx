import React, { useState, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

function AddRecipe() {
  const { t } = useTranslation("addRecipe");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg font-semibold text-center">
          {t("errors.unauthorized") || "Access denied. Admins only."}
        </p>
      </div>
    );
  }

  const [form, setForm] = useState({
    title: "",
    description: "",
    mood: "",
    ingredients: "",
    instructions: "",
    cookTime: "",
    difficulty: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post("http://localhost:5000/api/recipes", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/recipes");
    } catch (err) {
      setError(err.response?.data?.message || t("errors.submit"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-[#2d4032] mb-6">
        {t("title")}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder={t("labelTitle")}
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <textarea
          name="description"
          placeholder={t("labelDescription")}
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <select
          name="mood"
          value={form.mood}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-[#fdfcf8]"
          required
        >
          <option value="">{t("selectMood")}</option>
          <option value="hungry">{t("hungry")}</option>
          <option value="sad">{t("sad")}</option>
          <option value="stressed">{t("stressed")}</option>
          <option value="tired">{t("tired")}</option>
          <option value="relaxed">{t("relaxed")}</option>
          <option value="happy">{t("happy")}</option>
          <option value="bored">{t("bored")}</option>
          <option value="romantic">{t("romantic")}</option>
          <option value="anxious">{t("anxious")}</option>
          <option value="energetic">{t("energetic")}</option>
        </select>

        <input
          type="text"
          name="ingredients"
          placeholder={t("labelIngredients")}
          value={form.ingredients}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <textarea
          name="instructions"
          placeholder={t("labelInstructions")}
          value={form.instructions}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <input
          type="number"
          name="cookTime"
          placeholder={t("labelCookTime")}
          value={form.cookTime}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-[#fdfcf8]"
          required
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-[#fdfcf8]"
          required
        >
          <option value="">{t("selectDifficulty")}</option>
          <option value="easy">{t("difficulty.easy")}</option>
          <option value="medium">{t("difficulty.medium")}</option>
          <option value="hard">{t("difficulty.hard")}</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#567158] text-white py-2 rounded-lg hover:bg-[#3f5744] transition"
          disabled={loading}
        >
          {loading ? t("loading") : t("submit")}
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
