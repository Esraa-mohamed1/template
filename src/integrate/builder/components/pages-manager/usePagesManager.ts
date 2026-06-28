import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { CreatePagePayload, getPages, updatePage, deletePage } from '@/services/pages';
import { AcademyPage } from '../../interfaces';

const INITIAL_PAGES: AcademyPage[] = [
  { id: '1', name: 'الرئيسية', slug: 'home', createdAt: '22/10/2022', status: 'published', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqzo_VQo06VQCFdzirf_0z2ioWmpWofFyxtbeUSOpgDZrefJDg9H6UA9iCfqy4ro7yg5FfYec1hNWpAg3PRosaeLX6QWVUEzwo9ublQriYxfSfNDlWA1uW1O6hw0le5xYhMv7XPFhD6yd7QpDnU9K5cZxFvPxYlfNukbtioKQZrrRJZFrM7nRQG0i4Kox8vCBDr8AVXDoZiEZCpnzjCCNjg_6oXBTMLW_BrGX4m-hb12D3_A2ef40AdQp3X9xGODqnl-ASu_rn0GM' },
  { id: '2', name: 'من نحن', slug: 'about-us', createdAt: '19/8/2019', status: 'published' },
  { id: '3', name: 'تواصل معنا', slug: 'contact-us', createdAt: '14/1/2023', status: 'published' },
  { id: '4', name: 'تفاصيل الدورة', slug: 'course-details', createdAt: '7/1/2008', status: 'published' },
  { id: '5', name: 'الإحصائيات', slug: 'statistics', createdAt: '12/10/2022', status: 'published' }
];

export function usePagesManager() {
  const [pages, setPages] = useState<AcademyPage[]>(INITIAL_PAGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEditPage, setCurrentEditPage] = useState<AcademyPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [pendingPage, setPendingPage] = useState<AcademyPage | null>(null);
  const [pendingPagePayload, setPendingPagePayload] = useState<CreatePagePayload | null>(null);

  // Load pages from backend API
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const backendPages = await getPages();
        if (backendPages && backendPages.length > 0) {
          setPages(backendPages);
          localStorage.setItem('darab_academy_pages', JSON.stringify(backendPages));
        } else {
          // If backend returns empty, load from cache or fallback
          const cached = localStorage.getItem('darab_academy_pages');
          if (cached) {
            setPages(JSON.parse(cached));
          } else {
            setPages(INITIAL_PAGES);
          }
        }
      } catch (err) {
        console.error('Failed to fetch pages from backend:', err);
        const cached = localStorage.getItem('darab_academy_pages');
        if (cached) {
          try {
            setPages(JSON.parse(cached));
          } catch (e) {
            console.error('Failed to parse cached pages:', e);
          }
        } else {
          setPages(INITIAL_PAGES);
        }
      }
    };

    fetchPages();
  }, []);

  const handleToggleStatus = async (id: string, newStatus: 'published' | 'draft') => {
    const originalPages = [...pages];
    const updated = pages.map(page =>
      page.id === id ? { ...page, status: newStatus } : page
    );
    setPages(updated);

    try {
      await updatePage(id, { status: newStatus });
      localStorage.setItem('darab_academy_pages', JSON.stringify(updated));
      toast.success(newStatus === 'published' ? 'تم نشر الصفحة بنجاح!' : 'تم إلغاء نشر الصفحة.');
    } catch (err) {
      console.error('Failed to update page status on server:', err);
      setPages(originalPages); // rollback
      toast.error('فشل تحديث حالة الصفحة على السيرفر.');
    }
  };

  const handleDeletePage = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: 'حذف الصفحة',
      text: `هل أنت متأكد من حذف صفحة "${name}" نهائياً؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'نعم، احذف الصفحة',
      cancelButtonText: 'إلغاء',
      customClass: {
        popup: 'rounded-[2rem]',
      }
    });

    if (result.isConfirmed) {
      const originalPages = [...pages];
      const updated = pages.filter(page => page.id !== id);
      setPages(updated);

      try {
        await deletePage(id);
        localStorage.setItem('darab_academy_pages', JSON.stringify(updated));
        toast.success('تم حذف الصفحة بنجاح.');
      } catch (err) {
        console.error('Failed to delete page on server:', err);
        setPages(originalPages); // rollback
        toast.error('فشل حذف الصفحة من السيرفر.');
      }
    }
  };

  const handleSavePageDetails = async (updatedPage: AcademyPage, pagePayload?: CreatePagePayload) => {
    if (isCreating && pagePayload) {
      setPendingPage(updatedPage);
      setPendingPagePayload(pagePayload);
      setCurrentEditPage(null);
      setIsCreating(false);
      setShowTemplatePicker(true);
      return;
    }

    const originalPages = [...pages];
    const updated = pages.map(p => p.id === updatedPage.id ? { ...p, ...updatedPage } : p);
    setPages(updated);

    try {
      await updatePage(updatedPage.id, {
        title: updatedPage.name,
        slug: updatedPage.slug,
        status: updatedPage.status,
      });
      localStorage.setItem('darab_academy_pages', JSON.stringify(updated));
      toast.success('تم حفظ تعديلات الصفحة بنجاح!');
    } catch (err) {
      console.error('Failed to update page details on server:', err);
      setPages(originalPages); // rollback
      toast.error('فشل تعديل بيانات الصفحة على السيرفر.');
    }
    setCurrentEditPage(null);
    setIsCreating(false);
  };

  const handleTemplateSelected = (templateId: string, pageId: string | number) => {
    if (pendingPage) {
      const newPage: AcademyPage = {
        ...pendingPage,
        id: String(pageId),
        templateId: templateId
      };
      const updated = [...pages, newPage];
      setPages(updated);
      localStorage.setItem('darab_academy_pages', JSON.stringify(updated));
    }
    setShowTemplatePicker(false);
    setPendingPagePayload(null);
    setPendingPage(null);
  };

  const filteredPages = pages.filter(page =>
    page.name.includes(searchQuery) || page.slug.includes(searchQuery)
  );

  return {
    pages,
    searchQuery,
    setSearchQuery,
    currentEditPage,
    setCurrentEditPage,
    isCreating,
    setIsCreating,
    showTemplatePicker,
    setShowTemplatePicker,
    pendingPagePayload,
    handleToggleStatus,
    handleDeletePage,
    handleSavePageDetails,
    handleTemplateSelected,
    filteredPages
  };
}
