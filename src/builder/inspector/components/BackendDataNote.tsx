import React from 'react';
import { ExternalLink } from 'lucide-react';

interface BackendDataNoteProps {
  pageName?: string;
  pageLink?: string;
  description?: string;
}

export default function BackendDataNote({
  pageName = 'صفحة الإدارة',
  pageLink = '/admin/products',
  description = 'هذا القسم يعرض بيانات حية من الخادم. لتعديل المحتوى، يُرجى الذهاب إلى صفحة الإدارة المخصصة.',
}: BackendDataNoteProps) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#fed7aa', backgroundColor: '#fff7ed' }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: '#ffedd5' }}>
        <span className="text-base">🔗</span>
        <span className="text-[11px] font-black text-orange-700">بيانات من الخادم (Backend)</span>
      </div>
      <div className="p-4">
        <p className="text-[11px] text-orange-800 leading-relaxed mb-3">{description}</p>
        <a
          href={pageLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-black text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ExternalLink size={11} />
          فتح {pageName}
        </a>
      </div>
    </div>
  );
}
