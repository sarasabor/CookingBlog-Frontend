import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      setError(err.response?.data?.message || t("addRecipe.errors.submit"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-[#2d4032] mb-6">
        {t("addRecipe.title")}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder={t("addRecipe.fields.title")}
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border bg-[#fdfcf8] focus:outline-none focus:ring-2 focus:ring-[#567158]"
        />

        <textarea
          name="description"
          placeholder={t("addRecipe.fields.description")}
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full p-3 rounded-lg border bg-[#fdfcf8] focus:outline-none focus:ring-2 focus:ring-[#567158]"
        ></textarea>

        <select
          name="mood"
          value={form.mood}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border bg-[#fdfcf8] focus:outline-none focus:ring-2 focus:ring-[#567158]"
        >
          <option value="">{t("addRecipe.fields.selectMood")}</option>
          <option value="hungry">{t("addRecipe.fields.hungry")}</option>
          <option value="light">{t("addRecipe.fields.light")}</option>
          <option value="sweet">{t("addRecipe.fields.sweet")}</option>
          <option value="quick">{t("addRecipe.fields.quick")}</option>
          <option value="fancy">{t("addRecipe.fields.fancy")}</option>
        </select>

        <input
          type="text"
          name="ingredients"
          placeholder={t("addRecipe.fields.ingredients")}
          value={form.ingredients}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border bg-[#fdfcf8] focus:outline-none focus:ring-2 focus:ring-[#567158]"
        />

        <textarea
          name="instructions"
          placeholder={t("addRecipe.fields.instructions")}
          value={form.instructions}
          onChange={handleChange}
          required
          rows="4"
          className="w-full p-3 rounded-lg border bg-[#fdfcf8] focus:outline-none focus:ring-2 focus:ring-[#567158]"
        ></textarea>

        <input
          type="number"
          name="cookTime"
          placeholder={t("addRecipe.fields.cookTime")}
          value={form.cookTime}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border bg-[#fdfcf8] focus:outline-none focus:ring-2 focus:ring-[#567158]"
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border bg-[#fdfcf8] focus:outline-none focus:ring-2 focus:ring-[#567158]"
        >
          <option value="">{t("addRecipe.fields.difficulty")}</option>
          <option value="Easy">{t("addRecipe.fields.easy")}</option>
          <option value="Medium">{t("addRecipe.fields.medium")}</option>
          <option value="Hard">{t("addRecipe.fields.hard")}</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full bg-white text-sm"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#567158] text-white py-2 rounded-lg hover:bg-[#3f5744] transition"
        >
          {t("addRecipe.submit")}
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
