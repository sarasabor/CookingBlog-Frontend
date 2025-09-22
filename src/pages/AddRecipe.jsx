import React, { useState, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AddRecipe() {
  const { t } = useTranslation("addRecipe");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    mood: "",
    instructions: "",
    cookTime: "",
    difficulty: "",
    image: null,
  });

  const [ingredients, setIngredients] = useState([
    { en: "", fr: "", ar: "", quantity: "" },
  ]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg font-semibold text-center">
          {t("errors.unauthorized") || "Access denied. Admins only."}
        </p>
      </div>
    );
  }

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
    formData.append("ingredients", JSON.stringify(ingredients));

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      await axios.post(`${API_URL}/recipes`, formData, {
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
          {["hungry", "sad", "stressed", "tired", "relaxed", "happy", "bored", "romantic", "anxious", "energetic"].map(
            (m) => (
              <option key={m} value={m}>{t(m)}</option>
            )
          )}
        </select>

        <div>
          <label className="block font-medium mb-2">{t("labelIngredients")}</label>
          {ingredients.map((ing, index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <input
                type="text"
                placeholder="English"
                value={ing.en}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index].en = e.target.value;
                  setIngredients(updated);
                }}
                className="p-2 border rounded bg-[#fdfcf8]"
                required
              />
              <input
                type="text"
                placeholder="Français"
                value={ing.fr}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index].fr = e.target.value;
                  setIngredients(updated);
                }}
                className="p-2 border rounded bg-[#fdfcf8]"
                required
              />
              <input
                type="text"
                placeholder="العربية"
                value={ing.ar}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index].ar = e.target.value;
                  setIngredients(updated);
                }}
                className="p-2 border rounded bg-[#fdfcf8]"
                required
              />
              <input
                type="text"
                placeholder={t("quantity")}
                value={ing.quantity}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index].quantity = e.target.value;
                  setIngredients(updated);
                }}
                className="p-2 border rounded bg-[#fdfcf8]"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIngredients([...ingredients, { en: "", fr: "", ar: "", quantity: "" }])}
            className="text-green-700 font-semibold"
          >
            + {t("addIngredient")}
          </button>
        </div>

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
