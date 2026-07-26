import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import RecursiveRenderer from "../builder/renderer/RecursiveRenderer";
import { MOCK_TEMPLATES } from "../builder/utils/templates";
import { getSections, apiToEditor } from "../services/pages";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import SectionBlock from "../components/home/BestOffers";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import InstagramGrid from "../components/home/InstagramGrid";
import { Product } from "../types";
import { HomeSection } from "../types/api";
import { homeSectionService } from "../services/homeSectionService";

interface HomePageProps {
  onProductClick: (p: Product) => void;
  onCategoryClick: (c: string) => void;
  key?: React.Key;
}

const HomePage = ({ onProductClick, onCategoryClick }: HomePageProps) => {
  const [template, setTemplate] = useState<any>(null);
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [useBuilder, setUseBuilder] = useState<boolean | null>(null);

  useEffect(() => {
    const loadHomeTemplate = async () => {
      try {
        const apiSections = await getSections("1");
        if (apiSections && apiSections.length > 0) {
          const editorNodes = apiToEditor(apiSections);
          setTemplate({ sections: editorNodes });
          setUseBuilder(true);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch home page sections from API:", err);
      }

      const saved = localStorage.getItem("darab_builder_template_e-commerce-home");
      if (saved) {
        try {
          setTemplate(JSON.parse(saved));
          setUseBuilder(true);
          return;
        } catch (e) {
          console.error("Failed to parse saved e-commerce-home template", e);
        }
      }

      setUseBuilder(false);
      homeSectionService.getAll().then((res) => setSections(res.data ?? []));
    };

    loadHomeTemplate();
  }, []);

  if (useBuilder === null) {
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
      {useBuilder && template ? (
        <RecursiveRenderer
          nodes={template.sections}
          onProductClick={onProductClick}
          onCategoryClick={onCategoryClick}
          forcePreview={true}
        />
      ) : (
        <>
          <Hero />
          <div id="home-categories-nav">
            <Categories onCategoryClick={onCategoryClick} />
          </div>

          {sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              onProductClick={(id) =>
                onProductClick({ id: String(id) } as Product)
              }
            />
          ))}

          <WhyChooseUs />
          <Testimonials />
          <InstagramGrid />
        </>
      )}
    </motion.div>
  );
};

export default HomePage;
