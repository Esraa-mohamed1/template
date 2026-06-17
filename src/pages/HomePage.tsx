import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import RecursiveRenderer from "../builder/renderer/RecursiveRenderer";
import { MOCK_TEMPLATES } from "../builder/utils/templates";
import { Product } from "../types";

interface HomePageProps {
  onProductClick: (p: Product) => void;
  onCategoryClick: (c: string) => void;
}

const HomePage = ({ onProductClick, onCategoryClick }: HomePageProps) => {
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
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
