import { ComponentRegistryEntry } from '../interfaces';

// ─── Shared Section Background & Shape Fields (added to every component) ──────

const SECTION_STYLE_FIELDS = [
  {
    name: 'sectionBgType', label: 'نوع خلفية القسم', type: 'select' as const, defaultValue: 'solid', options: [
      { label: 'لون صلب', value: 'solid' },
      { label: 'تدرج (Gradient)', value: 'gradient' },
      { label: 'صورة (Image)', value: 'image' },
    ]
  },
  { name: 'sectionBg', label: 'لون خلفية القسم', type: 'color' as const, defaultValue: '' },
  { name: 'sectionGradientFrom', label: 'تدرج - اللون الأول', type: 'color' as const, defaultValue: '#2563eb' },
  { name: 'sectionGradientTo', label: 'تدرج - اللون الثاني', type: 'color' as const, defaultValue: '#7c3aed' },
  {
    name: 'sectionGradientDir', label: 'اتجاه التدرج', type: 'select' as const, defaultValue: 'to-br', options: [
      { label: 'يمين ← يسار', value: 'to-r' },
      { label: 'يسار ← يمين', value: 'to-l' },
      { label: 'أسفل', value: 'to-b' },
      { label: 'أعلى', value: 'to-t' },
      { label: 'قطري ↘', value: 'to-br' },
      { label: 'قطري ↗', value: 'to-tr' },
    ]
  },
  { name: 'sectionBgImage', label: 'رابط صورة خلفية القسم (URL)', type: 'text' as const, defaultValue: '' },
  { name: 'sectionBgOverlay', label: 'شفافية تغطية صورة الخلفية (%)', type: 'number' as const, defaultValue: 40 },
  {
    name: 'sectionShape', label: 'شكل زخرفي للقسم', type: 'select' as const, defaultValue: 'none', options: [
      { label: 'بلا', value: 'none' },
      { label: 'موجة علوية', value: 'wave-top' },
      { label: 'موجة سفلية', value: 'wave-bottom' },
      { label: 'دوائر ضبابية', value: 'circle-blur' },
      { label: 'Blob', value: 'blob' },
      { label: 'نقاط شبكية', value: 'grid-dots' },
      { label: 'خطوط قطرية', value: 'diagonal-lines' },
    ]
  },
  { name: 'sectionShapeColor', label: 'لون الشكل الزخرفي', type: 'color' as const, defaultValue: '#3b82f6' },
  { name: 'sectionShapeOpacity', label: 'شفافية الشكل الزخرفي (%)', type: 'number' as const, defaultValue: 20 },
];

export const COMPONENT_REGISTRY: Record<string, ComponentRegistryEntry> = {
  'home-hero': {
    type: 'home-hero',
    name: 'هيرو المتجر (Fashion Hero)',
    category: 'ecommerce',
    icon: 'Sparkles',
    fields: [
      { name: 'avatarUrl', label: 'صورة المالك / الأفاتار', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop', note: 'رابط الصورة الرمزية الصغيرة للمالك أو شعار المتجر الترحيبي.' },
      { name: 'avatarText', label: 'نص الأفاتار الترحيبي', type: 'textarea', defaultValue: 'E.buy is the right place for you to buy your fashion clothes with a reasonable price and trust.', note: 'الوصف الترحيبي القصير الذي يظهر بجوار الصورة الرمزية.' },
      { name: 'titlePart1', label: 'العنوان الرئيسي - السطر 1', type: 'text', defaultValue: 'You can feel', note: 'الكلمات الأولى من العنوان الكبير لجذب انتباه الزوار.' },
      { name: 'titlePart2', label: 'العنوان الرئيسي - الملون (Fashion)', type: 'text', defaultValue: 'fashion', note: 'الكلمة المميزة التي ستظهر بلون جذاب ومختلف للتركيز عليها.' },
      { name: 'titlePart3', label: 'العنوان الرئيسي - السطر 2', type: 'text', defaultValue: 'sense.', note: 'تكملة السطر الثاني من العنوان الرئيسي للقسم.' },
      { name: 'buttonText', label: 'نص زر التسوق', type: 'text', defaultValue: 'Shop Now', note: 'الكتابة التي تظهر داخل الزر الرئيسي ذي التفاعل الحركي.' },
      { name: 'secondButtonText', label: 'نص زر المعرفة', type: 'text', defaultValue: 'Learn More', note: 'الكتابة التي تظهر في الزر الثانوي المائل للهدوء.' },
      { name: 'img1', label: 'صورة المعرض الأولى (كبيرة)', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop', note: 'رابط صورة العرض الرئيسية الكبيرة المتواجدة في المعرض.' },
      { name: 'img2', label: 'صورة المعرض الثانية (صغيرة علوية)', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop', note: 'رابط صورة العرض الصغيرة العلوية في المعرض.' },
      { name: 'img3', label: 'صورة المعرض الثالثة (صغيرة سفلية)', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop', note: 'رابط صورة العرض الصغيرة السفلية في المعرض.' },
      { name: 'textColor', label: 'لون النص الأساسي', type: 'color', defaultValue: '#1e293b', note: 'اللون الرئيسي لجميع النصوص داخل هذا القسم.' },
      { name: 'accentColor', label: 'اللون التمييزي', type: 'color', defaultValue: '#f97316', note: 'اللون الخاص بالكلمة المميزة والأزرار النشطة.' },
      { name: 'bgColor', label: 'لون خلفية القسم', type: 'color', defaultValue: '#ffffff', note: 'لون خلفية قسم الهيرو بالكامل.' },
      { 
        name: 'imageSize', 
        label: 'حجم صور المعرض', 
        type: 'select', 
        defaultValue: 'medium', 
        options: [
          { label: 'صغير', value: 'small' },
          { label: 'متوسط', value: 'medium' },
          { label: 'كبير', value: 'large' }
        ],
        note: 'يتحكم في أبعاد الصور الثلاثة المعروضة على يسار/يمين القسم.'
      },
      {
        name: 'align',
        label: 'محاذاة المحتوى',
        type: 'select',
        defaultValue: 'right',
        options: [
          { label: 'يمين الصفحة', value: 'right' },
          { label: 'وسط الصفحة', value: 'center' },
          { label: 'يسار الصفحة', value: 'left' }
        ],
        note: 'مكان تموضع النصوص الترحيبية والأزرار في الصفحة.'
      },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      avatarText: 'E.buy is the right place for you to buy your fashion clothes with a reasonable price and trust.',
      titlePart1: 'You can feel',
      titlePart2: 'fashion',
      titlePart3: 'sense.',
      buttonText: 'Shop Now',
      secondButtonText: 'Learn More',
      img1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
      textColor: '#1e293b',
      accentColor: '#f97316',
      bgColor: '#ffffff',
      imageSize: 'medium',
      align: 'right'
    }
  },
  'home-categories': {
    type: 'home-categories',
    name: 'تصنيفات المتجر (Popular Categories)',
    category: 'ecommerce',
    icon: 'LayoutGrid',
    fields: [
      { name: 'title', label: 'عنوان القسم', type: 'text', defaultValue: 'Popular categories', note: 'العنوان الذي يظهر في منتصف القسم للتعريف بالتصنيفات.' },
      { name: 'textColor', label: 'لون عنوان القسم', type: 'color', defaultValue: '#1e293b', note: 'لون عنوان القسم ونصوص أسماء التصنيفات.' },
      { name: 'bgColor', label: 'لون خلفية قسم التصنيفات', type: 'color', defaultValue: '#ffffff', note: 'لون خلفية القسم الذي يحتوي على التصنيفات.' },
      { name: 'accentColor', label: 'اللون التمييزي عند التمرير', type: 'color', defaultValue: '#f97316', note: 'لون الحدود الدائرية للتصنيف عند تمرير الفأرة فوقه.' },
      { 
        name: 'imageSize', 
        label: 'حجم دوائر التصنيفات', 
        type: 'select', 
        defaultValue: 'medium', 
        options: [
          { label: 'صغير', value: 'small' },
          { label: 'متوسط', value: 'medium' },
          { label: 'كبير', value: 'large' }
        ],
        note: 'حجم الأيقونة الدائرية لكل تصنيف معروض.'
      },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      title: 'Popular categories',
      textColor: '#1e293b',
      bgColor: '#ffffff',
      accentColor: '#f97316',
      imageSize: 'medium'
    }
  },
  'home-products': {
    type: 'home-products',
    name: 'منتجات وعروض المتجر (E-Commerce Products)',
    category: 'ecommerce',
    icon: 'GraduationCap',
    fields: [
      { name: 'showDivider', label: 'إظهار خط فاصل سفلي', type: 'boolean', defaultValue: true, note: 'تفعيل إظهار خط رمادي أنيق لفصل هذا القسم عن القسم الذي يليه.' },
      { name: 'textColor', label: 'لون نصوص المنتجات', type: 'color', defaultValue: '#1e293b', note: 'لون أسماء المنتجات والتفاصيل الكتابية المرافقة.' },
      { name: 'bgColor', label: 'لون خلفية قسم المنتجات', type: 'color', defaultValue: '#ffffff', note: 'لون الخلفية للقسم الذي يستعرض بطاقات المنتجات.' },
      { name: 'accentColor', label: 'لون الأسعار والأزرار', type: 'color', defaultValue: '#f97316', note: 'اللون المميز للأسعار المعروضة وزر شراء المنتج.' },
      { name: 'cardBg', label: 'لون خلفية بطاقة المنتج', type: 'color', defaultValue: '#ffffff', note: 'لون خلفية الكارد/البطاقة الخاصة بكل منتج على حدة.' },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      showDivider: true,
      textColor: '#1e293b',
      bgColor: '#ffffff',
      accentColor: '#f97316',
      cardBg: '#ffffff'
    }
  },
  'home-why-choose-us': {
    type: 'home-why-choose-us',
    name: 'لماذا تختارنا (Why Choose Us)',
    category: 'ecommerce',
    icon: 'TrendingUp',
    fields: [
      { name: 'title', label: 'عنوان القسم الرئيسي', type: 'text', defaultValue: 'Why choose us', note: 'العنوان الجاذب الرئيسي للقسم.' },
      { name: 'buttonText', label: 'نص زر الشراء', type: 'text', defaultValue: 'Shop Now', note: 'نص دعوة اتخاذ الإجراء للشراء السريع.' },
      { name: 'feature1_title', label: 'ميزة 1: العنوان', type: 'text', defaultValue: 'First Delivery', note: 'العنوان الفرعي للميزة الأولى.' },
      { name: 'feature1_desc', label: 'ميزة 1: الوصف', type: 'textarea', defaultValue: 'We take care of the set-up process, aggregating all your existing online.', note: 'شرح بسيط وسهل لكيفية عمل الميزة الأولى.' },
      { name: 'feature2_title', label: 'ميزة 2: العنوان', type: 'text', defaultValue: '24/7 Online Support', note: 'العنوان الفرعي للميزة الثانية.' },
      { name: 'feature2_desc', label: 'ميزة 2: الوصف', type: 'textarea', defaultValue: 'Respond and resolve your customer queries instantly by implementing live chat.', note: 'شرح مبسط لكيفية توفير الدعم الفني للعملاء.' },
      { name: 'feature3_title', label: 'ميزة 3: العنوان', type: 'text', defaultValue: '4.9 Ratings', note: 'العنوان الفرعي للميزة الثالثة.' },
      { name: 'feature3_desc', label: 'ميزة 3: الوصف', type: 'textarea', defaultValue: "Here's to the people who leave online reviews! So you can take your decision.", note: 'شرح بسيط لثقة وتقييمات العملاء لمتجرك.' },
      { name: 'feature4_title', label: 'ميزة 4: العنوان', type: 'text', defaultValue: '10 Years Services', note: 'العنوان الفرعي للميزة الرابعة.' },
      { name: 'feature4_desc', label: 'ميزة 4: الوصف', type: 'textarea', defaultValue: 'Check out our 10 years of service awards, program tips, and strategies.', note: 'تفصيل بسيط لسنوات الخدمة والجوائز التي حصلت عليها.' },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      title: 'Why choose us',
      buttonText: 'Shop Now',
      feature1_title: 'First Delivery',
      feature1_desc: 'We take care of the set-up process, aggregating all your existing online.',
      feature2_title: '24/7 Online Support',
      feature2_desc: 'Respond and resolve your customer queries instantly by implementing live chat.',
      feature3_title: '4.9 Ratings',
      feature3_desc: "Here's to the people who leave online reviews! So you can take your decision.",
      feature4_title: '10 Years Services',
      feature4_desc: 'Check out our 10 years of service awards, program tips, and strategies.'
    }
  },
  'home-testimonials': {
    type: 'home-testimonials',
    name: 'آراء العملاء (Client Testimonials)',
    category: 'ecommerce',
    icon: 'Users',
    fields: [
      { name: 'title', label: 'عنوان القسم الرئيسي', type: 'text', defaultValue: 'What our clients say', note: 'العنوان الرئيسي الذي يظهر للزوار أعلى آراء وتقييمات المشترين.' },
      { name: 'testimonialText', label: 'نص التوصية / التقييم', type: 'textarea', defaultValue: '"My husband and I went for dinner in restaurant X and really enjoyed the atmosphere. The food was fresh and delicious and the best part was that the chef sent us a dessert they created that day. We were delighted to be the part of their business."', note: 'النص الكامل لرأي العميل المكتوب الذي سيقرأه الزوار.' },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      title: 'What our clients say',
      testimonialText: '"My husband and I went for dinner in restaurant X and really enjoyed the atmosphere. The food was fresh and delicious and the best part was that the chef sent us a dessert they created that day. We were delighted to be the part of their business."'
    }
  },
  'home-instagram-grid': {
    type: 'home-instagram-grid',
    name: 'معرض انستغرام (Instagram Feed)',
    category: 'ecommerce',
    icon: 'Globe',
    fields: [
      { name: 'title', label: 'عنوان القسم الرئيسي', type: 'text', defaultValue: 'Connect with us', note: 'العنوان الرئيسي المشجع لمتابعة حسابات التواصل الاجتماعي.' },
      { name: 'instagramHandle', label: 'اسم مستخدم انستغرام', type: 'text', defaultValue: '@Instagram', note: 'اسم حساب الانستغرام لمتجرك ويبدأ برمز @.' },
      { name: 'img1', label: 'صورة المعرض 1', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1529139570274-c3445ff24be9?q=80&w=400&auto=format&fit=crop', note: 'رابط الصورة الأولى المعروضة في شبكة انستغرام.' },
      { name: 'img2', label: 'صورة المعرض 2', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&auto=format&fit=crop', note: 'رابط الصورة الثانية المعروضة في شبكة انستغرام.' },
      { name: 'img3', label: 'صورة المعرض 3', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop', note: 'رابط الصورة الثالثة المعروضة في شبكة انستغرام.' },
      { name: 'img4', label: 'صورة المعرض 4', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop', note: 'رابط الصورة الرابعة المعروضة في شبكة انستغرام.' },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      title: 'Connect with us',
      instagramHandle: '@Instagram',
      img1: 'https://images.unsplash.com/photo-1529139570274-c3445ff24be9?q=80&w=400&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop',
      img4: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop'
    }
  },

  // ─── NEW: Premium Ecommerce Sections ─────────────────────────────────────────

  'ecommerce-hero': {
    type: 'ecommerce-hero',
    name: 'هيرو المتجر الاحترافي (E-Commerce Hero)',
    category: 'ecommerce',
    icon: 'Sparkles',
    fields: [
      { name: 'layoutFrame', label: 'إطار التخطيط', type: 'select', defaultValue: 'split-right', options: [
        { label: 'نص يسار / صورة يمين', value: 'split-right' },
        { label: 'صورة يسار / نص يمين', value: 'split-left' },
        { label: 'مركز الصفحة', value: 'centered' },
        { label: 'صورة كاملة مع تغطية', value: 'fullwidth-overlay' },
        { label: 'أسلوب أمازون (Overlapping Banner)', value: 'amazon-style' },
      ], note: 'طريقة توزيع النصوص والصورة في قسم الهيرو.' },
      { name: 'headline', label: 'العنوان الرئيسي', type: 'text', defaultValue: 'Discover Amazing Deals', note: 'العنوان الجاذب الرئيسي للمتجر.' },
      { name: 'subheadline', label: 'العنوان الفرعي', type: 'textarea', defaultValue: 'Shop the latest trends with unbeatable prices. Free shipping on orders over $50.', note: 'شرح بسيط للمتجر وعروض التوصيل لزيادة ثقة المشتري.' },
      { name: 'badge', label: 'نص الشارة (Badge)', type: 'text', defaultValue: '🔥 Limited Time', note: 'شارة تحفيزية ملونة تظهر أعلى العنوان الرئيسي.' },
      { name: 'ctaText', label: 'نص زر الشراء', type: 'text', defaultValue: 'Shop Now', note: 'الكتابة التي تظهر على الزر الملون الرئيسي.' },
      { name: 'ctaLink', label: 'رابط زر الشراء', type: 'text', defaultValue: '#', note: 'الرابط الذي ينتقل إليه المشتري عند الضغط على الزر (مثلا #).' },
      { name: 'secondCtaText', label: 'نص الزر الثانوي', type: 'text', defaultValue: 'View All Deals', note: 'الكتابة التي تظهر على زر الاستعراض الثانوي.' },
      { name: 'productImage', label: 'صورة المنتج / البانر', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600', note: 'رابط صورة المنتج أو العرض الرئيسي في هذا القسم.' },
      { name: 'countdownLabel', label: 'تسمية العداد التنازلي', type: 'text', defaultValue: 'Deal ends in:', note: 'النص المرافق للمؤقت التنازلي لإثارة طابع الاستعجال.' },
      { name: 'showBadge', label: 'إظهار الشارة', type: 'boolean', defaultValue: true, note: 'تفعيل أو إخفاء الشارة الصغيرة أعلى عنوان الهيرو.' },
      { name: 'showRating', label: 'إظهار التقييم', type: 'boolean', defaultValue: true, note: 'عرض نجوم التقييم الإيجابية والآراء التفاعلية.' },
      { name: 'showCountdown', label: 'إظهار العداد التنازلي', type: 'boolean', defaultValue: true, note: 'تفعيل عداد الدقائق والثواني التنازلي.' },
      { name: 'bgColor', label: 'لون الخلفية', type: 'color', defaultValue: '#fff7ed', note: 'لون خلفية قسم الهيرو بالكامل.' },
      { name: 'accentColor', label: 'اللون التمييزي (Accent)', type: 'color', defaultValue: '#f97316', note: 'اللون المخصص لزر الشراء والشارة الترويجية.' },
      { name: 'textColor', label: 'لون النص', type: 'color', defaultValue: '#1e293b', note: 'اللون الأساسي لجميع العناوين والنصوص المقروءة.' },
      { 
        name: 'imageSize', 
        label: 'حجم صورة المنتج', 
        type: 'select', 
        defaultValue: 'medium', 
        options: [
          { label: 'صغير', value: 'small' },
          { label: 'متوسط', value: 'medium' },
          { label: 'كبير', value: 'large' }
        ],
        note: 'يتحكم في حجم وعرض صورة المنتج المعروضة بجانب النصوص.'
      },
      ...SECTION_STYLE_FIELDS,
    ],
    defaultProps: {
      layoutFrame: 'split-right',
      headline: 'Discover Amazing Deals',
      subheadline: 'Shop the latest trends with unbeatable prices. Free shipping on orders over $50.',
      badge: '🔥 Limited Time',
      ctaText: 'Shop Now',
      ctaLink: '#',
      secondCtaText: 'View All Deals',
      productImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600',
      countdownLabel: 'Deal ends in:',
      showBadge: true,
      showRating: true,
      showCountdown: true,
      bgColor: '#fff7ed',
      accentColor: '#f97316',
      textColor: '#1e293b',
      imageSize: 'medium'
    }
  },

  'ecommerce-product-grid': {
    type: 'ecommerce-product-grid',
    name: 'شبكة المنتجات (Product Grid)',
    category: 'ecommerce',
    icon: 'LayoutGrid',
    fields: [
      { name: 'layoutFrame', label: 'إطار التخطيط', type: 'select', defaultValue: '3-col', options: [
        { label: '3 أعمدة (افتراضي)', value: '3-col' },
        { label: '4 أعمدة', value: '4-col' },
        { label: 'عمودان', value: '2-col' },
        { label: 'قائمة رأسية', value: 'list' },
      ], note: 'تقسيم توزيع المنتجات في السطر الواحد.' },
      { name: 'sectionTitle', label: 'عنوان القسم', type: 'text', defaultValue: 'Featured Products', note: 'عنوان قسم المنتجات الرئيسي.' },
      { name: 'sectionSubtitle', label: 'وصف القسم', type: 'text', defaultValue: 'Handpicked deals just for you', note: 'وصف فرعي يظهر أسفل العنوان مباشرة.' },
      { name: 'showQuickView', label: 'زر المعاينة السريعة', type: 'boolean', defaultValue: true, note: 'إظهار أيقونة العين لمعاينة تفاصيل المنتج سريعا.' },
      { name: 'showWishlist', label: 'زر قائمة الأمنيات', type: 'boolean', defaultValue: true, note: 'إظهار زر القلب لحفظ المنتج للمفضلة.' },
      { name: 'showRating', label: 'إظهار التقييم والنجوم', type: 'boolean', defaultValue: true, note: 'تفعيل إظهار تقييم النجوم وعدد المراجعات للمشترين.' },
      { name: 'accentColor', label: 'اللون التمييزي', type: 'color', defaultValue: '#f97316', note: 'لون زر إضافة للسلة والشارات السعرية.' },
      { name: 'cardBg', label: 'لون خلفية البطاقة', type: 'color', defaultValue: '#ffffff', note: 'لون خلفية المربع/البطاقة الحاضنة للمنتج.' },
      { name: 'bgColor', label: 'لون خلفية القسم', type: 'color', defaultValue: '#ffffff', note: 'لون خلفية القسم الذي يحتوي على المنتجات بالكامل.' },
      { name: 'textColor', label: 'لون النصوص وعنوان القسم', type: 'color', defaultValue: '#1e293b', note: 'لون عنوان القسم الرئيسي والنصوص داخله.' },
      { 
        name: 'imageSize', 
        label: 'حجم صورة المنتج', 
        type: 'select', 
        defaultValue: 'medium', 
        options: [
          { label: 'صغير', value: 'small' },
          { label: 'متوسط', value: 'medium' },
          { label: 'كبير', value: 'large' }
        ],
        note: 'يتحكم في أبعاد وحجم صورة المنتج بداخل كل كارد/بطاقة.'
      },
      ...SECTION_STYLE_FIELDS,
    ],
    defaultProps: {
      layoutFrame: '3-col',
      sectionTitle: 'Featured Products',
      sectionSubtitle: 'Handpicked deals just for you',
      showQuickView: true,
      showWishlist: true,
      showRating: true,
      accentColor: '#f97316',
      cardBg: '#ffffff',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      imageSize: 'medium'
    }
  },

  'ecommerce-flash-sale': {
    type: 'ecommerce-flash-sale',
    name: 'فلاش سيل (Flash Sale)',
    category: 'ecommerce',
    icon: 'TrendingUp',
    fields: [
      { name: 'layoutFrame', label: 'إطار التخطيط', type: 'select', defaultValue: 'dark-scroll', options: [
        { label: 'داكن + تمرير أفقي', value: 'dark-scroll' },
        { label: 'فاتح مع عداد ضخم', value: 'light-banner' },
        { label: 'مبسط (Minimal)', value: 'minimal' },
      ], note: 'ستايل التخطيط لعرض المنتجات في الفلاش سيل.' },
      { name: 'sectionTitle', label: 'عنوان القسم', type: 'text', defaultValue: '⚡ Flash Sale', note: 'عنوان قسم العروض السريعة.' },
      { name: 'badgeText', label: 'نص الشارة', type: 'text', defaultValue: 'Today Only', note: 'نص الشارة الترويجية مثل (اليوم فقط).' },
      { name: 'showTimer', label: 'إظهار العداد التنازلي', type: 'boolean', defaultValue: true, note: 'تفعيل إظهار عداد الساعات التنازلي للبيع السريع.' },
      { name: 'timerLabel', label: 'تسمية العداد', type: 'text', defaultValue: 'Ends in:', note: 'الكتابة المرافقة للعداد.' },
      { name: 'bgColor', label: 'لون الخلفية (للإطار الداكن)', type: 'color', defaultValue: '#0f172a', note: 'لون خلفية قسم العروض السريعة.' },
      { name: 'accentColor', label: 'اللون التمييزي', type: 'color', defaultValue: '#f97316', note: 'اللون المميز للمؤقت والخصومات.' },
      { name: 'textColor', label: 'لون النص وعنوان القسم', type: 'color', defaultValue: '#ffffff', note: 'لون العنوان الرئيسي والتفاصيل الكتابية المرافقة.' },
      { 
        name: 'imageSize', 
        label: 'حجم صورة المنتج', 
        type: 'select', 
        defaultValue: 'medium', 
        options: [
          { label: 'صغير', value: 'small' },
          { label: 'متوسط', value: 'medium' },
          { label: 'كبير', value: 'large' }
        ],
        note: 'يتحكم في ارتفاع وأبعاد صور المنتجات في العروض.'
      },
      ...SECTION_STYLE_FIELDS,
    ],
    defaultProps: {
      layoutFrame: 'dark-scroll',
      sectionTitle: '⚡ Flash Sale',
      badgeText: 'Today Only',
      showTimer: true,
      timerLabel: 'Ends in:',
      bgColor: '#0f172a',
      accentColor: '#f97316',
      textColor: '#ffffff',
      imageSize: 'medium'
    }
  },

  'ecommerce-category-grid': {
    type: 'ecommerce-category-grid',
    name: 'تصنيفات المتجر الاحترافية (Category Grid)',
    category: 'ecommerce',
    icon: 'LayoutGrid',
    fields: [
      { name: 'layoutFrame', label: 'إطار التخطيط', type: 'select', defaultValue: '4-col-icon', options: [
        { label: '4 أعمدة مع صورة', value: '4-col-icon' },
        { label: '6 أعمدة مضغوطة', value: '6-col-compact' },
        { label: 'عمودان كبيران', value: '2-col-large' },
      ], note: 'كيفية ترتيب التصنيفات وحجم المربعات في الشاشة.' },
      { name: 'sectionTitle', label: 'عنوان القسم', type: 'text', defaultValue: 'Shop by Category', note: 'العنوان التعريفي للقسم.' },
      { name: 'textColor', label: 'لون نصوص التصنيفات', type: 'color', defaultValue: '#1e293b', note: 'لون نصوص أسماء التصنيفات وعدد المنتجات.' },
      { name: 'accentColor', label: 'اللون التمييزي', type: 'color', defaultValue: '#f97316', note: 'لون سهم الانتقال للتصنيف.' },
      { name: 'bgColor', label: 'لون خلفية القسم', type: 'color', defaultValue: '#f8fafc', note: 'اللون الخلفي لقسم التصنيفات بالكامل.' },
      { name: 'cardBg', label: 'لون خلفية بطاقة التصنيف', type: 'color', defaultValue: '#ffffff', note: 'لون خلفية المربع الحاضن لكل تصنيف.' },
      { 
        name: 'imageSize', 
        label: 'حجم صورة التصنيف', 
        type: 'select', 
        defaultValue: 'medium', 
        options: [
          { label: 'صغير', value: 'small' },
          { label: 'متوسط', value: 'medium' },
          { label: 'كبير', value: 'large' }
        ],
        note: 'يتحكم في أبعاد صور التصنيفات المعروضة.'
      },
      ...SECTION_STYLE_FIELDS,
    ],
    defaultProps: {
      layoutFrame: '4-col-icon',
      sectionTitle: 'Shop by Category',
      textColor: '#1e293b',
      accentColor: '#f97316',
      bgColor: '#f8fafc',
      cardBg: '#ffffff',
      imageSize: 'medium'
    }
  },

  'ecommerce-promo-banner': {
    type: 'ecommerce-promo-banner',
    name: 'بانر ترويجي (Promo Banner)',
    category: 'ecommerce',
    icon: 'PlaySquare',
    fields: [
      { name: 'layoutFrame', label: 'إطار التخطيط', type: 'select', defaultValue: 'fullwidth', options: [
        { label: 'عرض كامل مع تغطية', value: 'fullwidth' },
        { label: 'نص يسار / صورة يمين', value: 'half-left' },
        { label: 'صورة يسار / نص يمين', value: 'half-right' },
        { label: 'بانران جانبيان', value: 'split-2' },
      ]},
      { name: 'headline', label: 'العنوان الرئيسي', type: 'text', defaultValue: 'Summer Sale — Up to 60% Off' },
      { name: 'subtext', label: 'النص الفرعي', type: 'textarea', defaultValue: 'Shop exclusive deals across fashion, electronics, and home.' },
      { name: 'ctaText', label: 'نص زر الشراء', type: 'text', defaultValue: 'Shop the Sale' },
      { name: 'ctaLink', label: 'رابط الزر', type: 'text', defaultValue: '#' },
      { name: 'badgeText', label: 'نص الشارة', type: 'text', defaultValue: '🏷️ Limited Offer' },
      { name: 'bannerImage', label: 'رابط صورة البانر', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop' },
      { name: 'showBadge', label: 'إظهار الشارة', type: 'boolean', defaultValue: true },
      { name: 'overlayOpacity', label: 'شفافية التغطية (%)', type: 'number', defaultValue: 55 },
      { name: 'bgColor', label: 'لون التغطية', type: 'color', defaultValue: '#1e293b' },
      { name: 'accentColor', label: 'لون زر الشراء', type: 'color', defaultValue: '#f97316' },
      { name: 'textColor', label: 'لون النص', type: 'color', defaultValue: '#ffffff' },
      ...SECTION_STYLE_FIELDS,
    ],
    defaultProps: {
      layoutFrame: 'fullwidth',
      headline: 'Summer Sale — Up to 60% Off',
      subtext: 'Shop exclusive deals across fashion, electronics, and home.',
      ctaText: 'Shop the Sale',
      ctaLink: '#',
      badgeText: '🏷️ Limited Offer',
      bannerImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
      showBadge: true,
      overlayOpacity: 55,
      bgColor: '#1e293b',
      accentColor: '#f97316',
      textColor: '#ffffff',
    }
  },

  'ecommerce-testimonials': {
    type: 'ecommerce-testimonials',
    name: 'تقييمات العملاء (Customer Reviews)',
    category: 'ecommerce',
    icon: 'Users',
    fields: [
      { name: 'layoutFrame', label: 'إطار التخطيط', type: 'select', defaultValue: 'cards-row', options: [
        { label: 'بطاقات في صف', value: 'cards-row' },
        { label: 'شهادة مميزة (Carousel)', value: 'featured-large' },
        { label: 'Masonry (متداخل)', value: 'masonry' },
      ]},
      { name: 'sectionTitle', label: 'عنوان القسم', type: 'text', defaultValue: 'What Our Customers Say' },
      { name: 'sectionSubtitle', label: 'الوصف', type: 'text', defaultValue: 'Real reviews from verified shoppers worldwide.' },
      { name: 'accentColor', label: 'اللون التمييزي', type: 'color', defaultValue: '#f97316' },
      { name: 'bgColor', label: 'لون الخلفية', type: 'color', defaultValue: '#f8fafc' },
      ...SECTION_STYLE_FIELDS,
    ],
    defaultProps: {
      layoutFrame: 'cards-row',
      sectionTitle: 'What Our Customers Say',
      sectionSubtitle: 'Real reviews from verified shoppers worldwide.',
      accentColor: '#f97316',
      bgColor: '#f8fafc',
    }
  },

  'ecommerce-newsletter': {
    type: 'ecommerce-newsletter',
    name: 'النشرة البريدية (Newsletter CTA)',
    category: 'ecommerce',
    icon: 'Globe',
    fields: [
      { name: 'layoutFrame', label: 'إطار التخطيط', type: 'select', defaultValue: 'centered', options: [
        { label: 'وسط الصفحة', value: 'centered' },
        { label: 'نص يسار / نموذج يمين', value: 'split' },
        { label: 'بطاقة مدمجة', value: 'inline' },
      ]},
      { name: 'headline', label: 'العنوان الرئيسي', type: 'text', defaultValue: 'Stay in the Loop — Exclusive Deals Await!' },
      { name: 'subtext', label: 'النص الفرعي', type: 'textarea', defaultValue: 'Subscribe and be the first to know about flash sales and member-only discounts.' },
      { name: 'placeholder', label: 'نص حقل البريد', type: 'text', defaultValue: 'Enter your email address...' },
      { name: 'ctaText', label: 'نص زر الاشتراك', type: 'text', defaultValue: 'Subscribe' },
      { name: 'badgeText', label: 'نص الشارة التحفيزية', type: 'text', defaultValue: '🎁 Get 15% off your first order' },
      { name: 'showIcon', label: 'إظهار أيقونة القسم', type: 'boolean', defaultValue: true },
      { name: 'bgColor', label: 'لون الخلفية', type: 'color', defaultValue: '#0f172a' },
      { name: 'accentColor', label: 'لون زر الاشتراك', type: 'color', defaultValue: '#f97316' },
      { name: 'textColor', label: 'لون النصوص والعناوين', type: 'color', defaultValue: '#ffffff', note: 'لون نصوص العناوين والتفاصيل داخل النشرة البريدية.' },
      ...SECTION_STYLE_FIELDS,
    ],
    defaultProps: {
      layoutFrame: 'centered',
      headline: 'Stay in the Loop — Exclusive Deals Await!',
      subtext: 'Subscribe and be the first to know about flash sales and member-only discounts.',
      placeholder: 'Enter your email address...',
      ctaText: 'Subscribe',
      badgeText: '🎁 Get 15% off your first order',
      showIcon: true,
      bgColor: '#0f172a',
      accentColor: '#f97316',
      textColor: '#ffffff'
    }
  },
  'amazon-multi-card-grid': {
    type: 'amazon-multi-card-grid',
    name: 'شبكة كروت أمازون الرباعية (Amazon Multi-Card Grid)',
    category: 'ecommerce',
    icon: 'LayoutGrid',
    fields: [
      { name: 'sectionTitle', label: 'عنوان القسم (اختياري)', type: 'text', defaultValue: '' },
      { name: 'card1_title', label: 'العنوان - الكارت 1', type: 'text', defaultValue: 'أحدث صيحات الموضة' },
      { name: 'card1_linkText', label: 'نص رابط الكارت 1', type: 'text', defaultValue: 'تسوّق الأزياء' },
      { name: 'card1_linkUrl', label: 'رابط الكارت 1', type: 'text', defaultValue: '#' },
      { name: 'card2_title', label: 'العنوان - الكارت 2', type: 'text', defaultValue: 'الأجهزة والأدوات الذكية' },
      { name: 'card2_linkText', label: 'نص رابط الكارت 2', type: 'text', defaultValue: 'تصفح التقنية' },
      { name: 'card2_linkUrl', label: 'رابط الكارت 2', type: 'text', defaultValue: '#' },
      { name: 'card3_title', label: 'العنوان - الكارت 3', type: 'text', defaultValue: 'تصفح الفئات الأكثر شعبية' },
      { name: 'card3_linkText', label: 'نص رابط الكارت 3', type: 'text', defaultValue: 'عرض كل الفئات' },
      { name: 'card3_linkUrl', label: 'رابط الكارت 3', type: 'text', defaultValue: '#' },
      { name: 'card4_title', label: 'العنوان - الكارت 4', type: 'text', defaultValue: 'عرض محدود اليوم' },
      { name: 'card4_linkText', label: 'نص رابط الكارت 4', type: 'text', defaultValue: 'احصل على العرض' },
      { name: 'card4_linkUrl', label: 'رابط الكارت 4', type: 'text', defaultValue: '#' },
      { name: 'bgColor', label: 'لون خلفية القسم', type: 'color', defaultValue: '#FFF8F0' },
      { name: 'cardBg', label: 'لون خلفية الكروت', type: 'color', defaultValue: '#ffffff' },
      { name: 'textColor', label: 'لون النصوص', type: 'color', defaultValue: '#1e293b' },
      { name: 'accentColor', label: 'لون الروابط والتفاصيل', type: 'color', defaultValue: '#FF9900' },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      sectionTitle: '',
      card1_title: 'أحدث صيحات الموضة',
      card1_linkText: 'تسوّق الأزياء',
      card1_linkUrl: '#',
      card2_title: 'الأجهزة والأدوات الذكية',
      card2_linkText: 'تصفح التقنية',
      card2_linkUrl: '#',
      card3_title: 'تصفح الفئات الأكثر شعبية',
      card3_linkText: 'عرض كل الفئات',
      card3_linkUrl: '#',
      card4_title: 'عرض محدود اليوم',
      card4_linkText: 'احصل على العرض',
      card4_linkUrl: '#',
      bgColor: '#FFF8F0',
      cardBg: '#ffffff',
      textColor: '#1e293b',
      accentColor: '#FF9900'
    }
  },
  'amazon-deals-row': {
    type: 'amazon-deals-row',
    name: 'شريط عروض اليوم (Amazon Today\'s Deals Scroller)',
    category: 'ecommerce',
    icon: 'TrendingUp',
    fields: [
      { name: 'sectionTitle', label: 'عنوان قسم العروض', type: 'text', defaultValue: 'عروض اليوم الحصرية (Today\'s Deals)' },
      { name: 'viewAllText', label: 'نص زر تصفح الكل', type: 'text', defaultValue: 'تصفح كل العروض' },
      { name: 'viewAllLink', label: 'رابط زر تصفح الكل', type: 'text', defaultValue: '#' },
      { name: 'bgColor', label: 'لون خلفية القسم', type: 'color', defaultValue: '#ffffff' },
      { name: 'cardBg', label: 'لون خلفية الكروت', type: 'color', defaultValue: '#ffffff' },
      { name: 'textColor', label: 'لون النصوص', type: 'color', defaultValue: '#1e293b' },
      { name: 'accentColor', label: 'اللون التمييزي والروابط', type: 'color', defaultValue: '#FF9900' },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      sectionTitle: 'عروض اليوم الحصرية (Today\'s Deals)',
      viewAllText: 'تصفح كل العروض',
      viewAllLink: '#',
      bgColor: '#ffffff',
      cardBg: '#ffffff',
      textColor: '#1e293b',
      accentColor: '#FF9900'
    }
  },
  'amazon-signin-promo': {
    type: 'amazon-signin-promo',
    name: 'بانر تسجيل دخول أمازون (Amazon Sign-in Box)',
    category: 'ecommerce',
    icon: 'Users',
    fields: [
      { name: 'title', label: 'نص الدعوة الرئيسي', type: 'text', defaultValue: 'سجل دخولك للحصول على أفضل تجربة تسوق وتخفيضات مخصصة' },
      { name: 'buttonText', label: 'نص زر تسجيل الدخول', type: 'text', defaultValue: 'تسجيل الدخول الآمن' },
      { name: 'buttonLink', label: 'رابط زر تسجيل الدخول', type: 'text', defaultValue: '/auth' },
      { name: 'signupPromptText', label: 'نص دعوة التسجيل للجدد', type: 'text', defaultValue: 'عميل جديد؟ ابدأ من هنا' },
      { name: 'signupLink', label: 'رابط التسجيل للجدد', type: 'text', defaultValue: '/auth' },
      { name: 'bgColor', label: 'لون الخلفية', type: 'color', defaultValue: '#ffffff' },
      { name: 'textColor', label: 'لون النص', type: 'color', defaultValue: '#1e293b' },
      { name: 'accentColor', label: 'اللون الرئيسي للزر', type: 'color', defaultValue: '#FF9900' },
      ...SECTION_STYLE_FIELDS
    ],
    defaultProps: {
      title: 'سجل دخولك للحصول على أفضل تجربة تسوق وتخفيضات مخصصة',
      buttonText: 'تسجيل الدخول الآمن',
      buttonLink: '/auth',
      signupPromptText: 'عميل جديد؟ ابدأ من هنا',
      signupLink: '/auth',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      accentColor: '#FF9900'
    }
  },
};
