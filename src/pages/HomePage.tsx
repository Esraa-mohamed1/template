import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import SectionBlock from "../components/home/BestOffers"; // ✅
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
  const [sections, setSections] = useState<HomeSection[]>([]);

  useEffect(() => {
    homeSectionService.getAll().then((res) => setSections(res.data));
  }, []);

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <div id="home-categories-nav">
        <Categories onCategoryClick={onCategoryClick} />
      </div>

      {/* ✅ اللوب هنا */}
      {sections.map((section) => (
        <SectionBlock
          key={section.id}
          section={section}
          onProductClick={(id) => onProductClick({ id: String(id) } as Product)}
        />
      ))}

      <WhyChooseUs />
      <Testimonials />
      <InstagramGrid />
    </motion.div>
  );
};

export default HomePage;
