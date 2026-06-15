import React from 'react';

interface SectionHeaderProps {
  title: string;
  showButton?: boolean;
  id?: string;
}

const SectionHeader = ({ title, showButton, id }: SectionHeaderProps) => (
  <div id={id} className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    {showButton && (
      <button className="px-4 py-1.5 bg-brand-blue text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-all">
        View All
      </button>
    )}
  </div>
);

export default SectionHeader;
