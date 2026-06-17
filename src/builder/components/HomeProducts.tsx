import React, { useEffect, useState } from "react";
import { HomeSection } from "../../types/api";
import { homeSectionService } from "../../services/homeSectionService";
import SectionBlock from "../../components/home/BestOffers";
import { Product } from "../../types";

interface HomeProductsProps {
  showDivider?: boolean;
  onProductClick?: (p: Product) => void;
}

export default function HomeProducts({
  showDivider = true,
  onProductClick
}: HomeProductsProps) {
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeSectionService
      .getAll()
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Error loading home sections:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-sm font-semibold text-gray-500">Loading Products & Offers...</div>;
  }

  return (
    <div className="w-full">
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          <SectionBlock
            section={section}
            onProductClick={(id) => onProductClick && onProductClick({ id: String(id) } as Product)}
          />
        </React.Fragment>
      ))}
      {!showDivider && (
        <style dangerouslySetInnerHTML={{__html: `
          #categories-section + div hr, 
          section + div hr {
            display: none !important;
          }
        `}} />
      )}
    </div>
  );
}
