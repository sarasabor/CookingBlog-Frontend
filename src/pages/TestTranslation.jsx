import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TestTranslation() {
  const { t, i18n, ready } = useTranslation("addRecipe", { useSuspense: false });
  const [namespaceLoaded, setNamespaceLoaded] = useState(false);

  useEffect(() => {
    i18n.reloadResources(i18n.language, "addRecipe").then(() => {
      const isLoaded = i18n.hasResourceBundle(i18n.language, "addRecipe");
      setNamespaceLoaded(isLoaded);

      console.log("Current language:", i18n.language);
      console.log("Has resource bundle?", i18n.hasResourceBundle(i18n.language, "addRecipe"));
      console.log("Available namespaces:", i18n.options.ns);

    });
  }, [i18n, i18n.language]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🔍 Translation Test</h2>
      <p>
        <strong>Current Language:</strong> {i18n.language}
      </p>
      <p>
        <strong>Namespace loaded?</strong>{" "}
        {namespaceLoaded ? "✅ Yes" : "❌ No"}
      </p>
      <p>
        <strong>t("title") =</strong> {t("title")}
      </p>
      <p>
        <strong>t("submit") =</strong> {t("submit")}
      </p>
      <p>
        <strong>t("cookTime") =</strong> {t("cookTime")}
      </p>

      <div className="mt-4 flex gap-3">
        <button
          className="border px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </button>
        <button
          className="border px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => i18n.changeLanguage("fr")}
        >
          FR
        </button>
        <button
          className="border px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => i18n.changeLanguage("ar")}
        >
          AR
        </button>
      </div>
    </div>
  );
}

export default TestTranslation;
