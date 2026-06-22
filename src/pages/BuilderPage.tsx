import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBuilderStore } from '../builder/store/builderStore';
import { COMPONENT_REGISTRY } from '../builder/registry/componentRegistry';
import { MOCK_TEMPLATES } from '../builder/utils/templates';
import { getSections, saveSections, apiToEditor, editorToApi } from '../services/pages';
import CanvasContainer from '../builder/canvas/CanvasContainer';
import InspectorPanel from '../builder/inspector/InspectorPanel';
import { 
  Sparkles, 
  PlaySquare, 
  TrendingUp, 
  LayoutGrid, 
  FileText, 
  Users, 
  GraduationCap, 
  Globe, 
  ChevronLeft,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  Plus,
  Compass,
  Layout,
  FolderOpen
} from 'lucide-react';
import { User } from '../types';

// Map icon names from registry to React Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  PlaySquare,
  TrendingUp,
  LayoutGrid,
  FileText,
  Users,
  GraduationCap,
  Globe,
  ChevronLeft
};

interface BuilderPageProps {
  onLogout: () => void;
  currentUser: User | null;
}

export default function BuilderPage({ onLogout, currentUser }: BuilderPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('pageId') || '1';
  const { 
    currentTemplate, 
    loadTemplate, 
    addNode, 
    deviceMode, 
    setDeviceMode, 
    isEditing, 
    setIsEditing, 
    undo, 
    redo, 
    saveDraft, 
    publishTemplate,
    historyPast,
    historyFuture
  } = useBuilderStore();

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Load active template on mount
  useEffect(() => {
    const fetchPageSections = async () => {
      let activeId = searchParams.get('templateId');
      if (!activeId) {
        activeId = localStorage.getItem('darab_active_template') || 'e-commerce-home';
      }

      if (pageId) {
        try {
          const apiSections = await getSections(pageId);
          if (apiSections && apiSections.length > 0) {
            const editorNodes = apiToEditor(apiSections);
            loadTemplate({
              id: activeId || 'dynamic-page',
              name: 'صفحة ديناميكية من السيرفر',
              status: 'published',
              version: '1.0',
              updatedAt: new Date().toISOString(),
              sections: editorNodes
            });
            return;
          }
        } catch (err) {
          console.error('Failed to load sections from backend:', err);
          showNotification('فشل تحميل البيانات من السيرفر، تم التحميل محلياً.', 'info');
        }
      }

      // Fallback: load from local storage or static templates
      const saved = localStorage.getItem(`darab_builder_template_${activeId}`);
      if (saved) {
        try {
          loadTemplate(JSON.parse(saved));
          return;
        } catch (e) {
          console.error("Failed to parse saved draft template", e);
        }
      }
      loadTemplate(MOCK_TEMPLATES[activeId] || MOCK_TEMPLATES['e-commerce-home']);
    };

    if (!currentTemplate) {
      fetchPageSections();
    }
  }, [currentTemplate, loadTemplate, pageId, searchParams]);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const saved = localStorage.getItem(`darab_builder_template_${id}`);
    if (saved) {
      try {
        loadTemplate(JSON.parse(saved));
        showNotification('تم تحميل المسودة المحفوظة لهذا القالب');
        return;
      } catch (err) {
        console.error(err);
      }
    }
    loadTemplate(MOCK_TEMPLATES[id]);
    showNotification('تم تحميل القالب بنجاح');
  };

  const handleAddNode = (type: string) => {
    const config = COMPONENT_REGISTRY[type];
    if (!config) return;

    const newNode = {
      id: `${type}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: { ...config.defaultProps },
      children: type === 'tabs' ? [] : undefined
    };

    addNode(newNode);
    showNotification(`تمت إضافة مكون ${config.name}`);
  };

  const handleSaveDraft = async () => {
    saveDraft();
    if (pageId && currentTemplate) {
      try {
        showNotification('جاري الحفظ في السيرفر...', 'info');
        const apiSections = editorToApi(currentTemplate.sections, pageId);
        await saveSections(pageId, apiSections);
        showNotification('تم حفظ المسودة في السيرفر والذاكرة المحلية بنجاح!', 'success');
      } catch (err) {
        console.error('Failed to save draft to server:', err);
        showNotification('خطأ أثناء حفظ المسودة في السيرفر', 'info');
      }
    } else {
      showNotification('تم حفظ المسودة في الذاكرة المحلية (LocalStorage)');
    }
  };

  const handlePublish = async () => {
    publishTemplate();
    if (pageId && currentTemplate) {
      try {
        showNotification('جاري نشر المظهر...', 'info');
        const apiSections = editorToApi(currentTemplate.sections, pageId);
        await saveSections(pageId, apiSections);
        showNotification('تم نشر التغييرات وتحديث رقم الإصدار بنجاح', 'success');
      } catch (err) {
        console.error('Failed to publish to server:', err);
        showNotification('خطأ أثناء نشر التغييرات في السيرفر', 'info');
      }
    } else {
      showNotification('تم نشر التغييرات وتحديث رقم الإصدار بنجاح', 'success');
    }
  };

  const categoryLabels: Record<string, string> = {
    layout: 'التخطيط والهيكل',
    content: 'المحتوى والواجهات',
    data: 'البيانات والتقارير',
    navigation: 'التنقل والتوجيه',
    ecommerce: 'عناصر المتجر (E-Commerce)'
  };

  // Group registry keys by category
  const groupedComponents = Object.keys(COMPONENT_REGISTRY).reduce((acc, key) => {
    const entry = COMPONENT_REGISTRY[key];
    if (!acc[entry.category]) {
      acc[entry.category] = [];
    }
    acc[entry.category].push(entry);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="h-screen bg-[#090d1f] flex flex-col overflow-hidden font-['IBM_Plex_Sans_Arabic'] text-slate-100 select-none" dir="rtl">
      
      {/* ─── Top Toolbar ─────────────────────────────────────────────────── */}
      <header className="h-18 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-40">
        
        {/* Left Side Actions (Branding & Back to site) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all border border-slate-700/30"
          >
            <ArrowLeft className="w-4 h-4 ml-0.5" />
            العودة للموقع
          </button>
          
          <div className="h-5 w-px bg-slate-800"></div>

          <div className="flex items-center gap-2.5">
            <span className="text-sm font-black text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              درب بيلدر
            </span>
            <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black px-2 py-0.5 rounded-md">
              إصدار {currentTemplate?.version || '1.0'}
            </span>
          </div>
        </div>

        {/* Center Actions (Simulations, Mode & History) */}
        <div className="flex items-center gap-6">
          
          {/* Template Loader */}
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-slate-400" />
            <select
              value={currentTemplate?.id || 'e-commerce-home'}
              onChange={handleTemplateChange}
              className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-200 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="e-commerce-home">قالب الصفحة الرئيسية للمتجر</option>
              <option value="academy-dashboard">لوحة التحكم الكلاسيكية</option>
              <option value="template_2">لوحة التحكم الفيروزية</option>
              <option value="template_3">القالب الأرجواني الإبداعي</option>
            </select>
          </div>

          <div className="h-5 w-px bg-slate-800"></div>

          {/* Device Simulators */}
          <div className="flex bg-slate-950/60 rounded-xl p-0.5 border border-slate-800">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 rounded-lg transition-all ${
                deviceMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="عرض شاشة مكتبية"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-2 rounded-lg transition-all ${
                deviceMode === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="عرض جهاز لوحي"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 rounded-lg transition-all ${
                deviceMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="عرض هاتف محمول"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-800"></div>

          {/* Edit / Preview toggles */}
          <div className="flex bg-slate-950/60 rounded-xl p-0.5 border border-slate-800">
            <button
              onClick={() => setIsEditing(true)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-1.5 transition-all ${
                isEditing ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              التحرير النشط
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-1.5 transition-all ${
                !isEditing ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isEditing ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              المعاينة الحية
            </button>
          </div>

          <div className="h-5 w-px bg-slate-800"></div>

          {/* Undo / Redo */}
          <div className="flex gap-1.5">
            <button
              onClick={undo}
              disabled={historyPast.length === 0}
              className="p-2 bg-slate-800/40 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-800/40 rounded-xl border border-slate-700/30 text-slate-300 transition-colors disabled:cursor-not-allowed cursor-pointer"
              title="تراجع"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={redo}
              disabled={historyFuture.length === 0}
              className="p-2 bg-slate-800/40 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-800/40 rounded-xl border border-slate-700/30 text-slate-300 transition-colors disabled:cursor-not-allowed cursor-pointer"
              title="إعادة تطبيق"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right Side Actions (Save & User) */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              حفظ مسودة
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              نشر المظهر
            </button>
          </div>

          <div className="h-5 w-px bg-slate-800"></div>

          {/* User Profile / Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-left">
              <div className="text-[10px] font-black text-slate-300">{currentUser?.name || 'مسؤول النظام'}</div>
              <div className="text-[9px] font-bold text-slate-500 text-right">مشرف</div>
            </div>
            <button 
              onClick={onLogout}
              className="p-2.5 hover:bg-red-500/10 hover:text-red-400 rounded-xl text-slate-400 transition-all"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </header>

      {/* ─── Layout Workspace ────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Panel: Elements Library */}
        <aside className="w-[280px] border-l border-slate-800 bg-[#0b0f24] flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-800/80">
            <h2 className="text-xs font-black text-white flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-400" />
              مكتبة المكونات
            </h2>
            <p className="text-[9px] font-bold text-slate-400 mt-1 leading-normal">
              انقر فوق أي مكون أدناه لإضافته فوراً إلى نهاية لوحة تحكم صفحتك.
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {Object.keys(groupedComponents).map((categoryKey) => (
              <div key={categoryKey} className="space-y-2.5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pr-1">
                  {categoryLabels[categoryKey] || categoryKey}
                </span>

                <div className="grid grid-cols-1 gap-2">
                  {groupedComponents[categoryKey].map((comp) => {
                    const CompIcon = iconMap[comp.icon] || LayoutGrid;
                    return (
                      <button
                        key={comp.type}
                        onClick={() => handleAddNode(comp.type)}
                        className="w-full flex items-center justify-between p-3.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/60 rounded-2xl text-right transition-all group cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-800 group-hover:bg-blue-600/10 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-400 border border-slate-700/30 transition-colors">
                            <CompIcon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                              {comp.name.replace(/\(.*?\)/, '')}
                            </div>
                            <div className="text-[9px] text-slate-500 font-semibold mt-0.5">
                              {comp.type}
                            </div>
                          </div>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Panel: Simulated Canvas Frame */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <CanvasContainer />
        </main>

        {/* Right Panel: Properties Inspector */}
        <aside className="shrink-0 border-r border-slate-800 bg-[#0b0f24] h-full flex flex-col">
          <InspectorPanel />
        </aside>

      </div>

      {/* Floating Notifications toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-[99] bg-slate-900 border border-slate-800 px-5 py-3.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 animate-slide-in">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="text-xs font-bold text-slate-200">{notification.message}</span>
        </div>
      )}

    </div>
  );
}
