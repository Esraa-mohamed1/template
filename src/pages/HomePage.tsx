import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import RecursiveRenderer from "../builder/renderer/RecursiveRenderer";
import { MOCK_TEMPLATES } from "../builder/utils/templates";
import { getSections, apiToEditor } from "../services/pages";
import { Product } from "../types";

interface HomePageProps {
  onProductClick: (p: Product) => void;
  onCategoryClick: (c: string) => void;
}

const HomePage = ({ onProductClick, onCategoryClick }: HomePageProps) => {
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
    const loadHomeTemplate = async () => {
      try {
        const apiSections = await getSections('1');
        if (apiSections && apiSections.length > 0) {
          const editorNodes = apiToEditor(apiSections);
          setTemplate({ sections: editorNodes });
          return;
        }
      } catch (err) {
        console.error("Failed to fetch home page sections from API:", err);
      }

      // Attempt to load the saved template from LocalStorage
      const saved = localStorage.getItem("darab_builder_template_e-commerce-home");
      if (saved) {
        try {
          setTemplate(JSON.parse(saved));
          return;
        } catch (e) {
          console.error("Failed to parse saved e-commerce-home template", e);
        }
      }
      // Fallback to default mock template
      setTemplate(MOCK_TEMPLATES["e-commerce-home"]);
    };

    loadHomeTemplate();
  }, []);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-gray-500 font-bold text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RecursiveRenderer 
        nodes={template.sections} 
        onProductClick={onProductClick}
        onCategoryClick={onCategoryClick}
        forcePreview={true}
      />
    </motion.div>
  );
};

export default HomePage;
