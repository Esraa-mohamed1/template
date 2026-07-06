import React from 'react';

interface AmazonSigninPromoProps {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  signupPromptText?: string;
  signupLink?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

export default function AmazonSigninPromo({
  title = 'سجل دخولك للحصول على أفضل تجربة تسوق وتخفيضات مخصصة',
  buttonText = 'تسجيل الدخول الآمن',
  buttonLink = '/auth',
  signupPromptText = 'عميل جديد؟ ابدأ من هنا',
  signupLink = '/auth',
  bgColor = '#ffffff',
  textColor = '#1e293b',
  accentColor = '#FF9900'
}: AmazonSigninPromoProps) {
  return (
    <section className="w-full py-8 px-6 text-center" style={{ backgroundColor: bgColor }}>
      <div className="max-w-2xl mx-auto border border-slate-100 rounded-3xl p-6 md:p-8 bg-white shadow-sm flex flex-col items-center gap-4 hover:shadow-md transition-shadow">
        <p style={{ color: textColor }} className="text-sm md:text-base font-bold leading-relaxed max-w-md">
          {title}
        </p>
        <a 
          href={buttonLink}
          style={{ backgroundColor: accentColor }}
          className="w-full sm:w-auto min-w-[200px] px-8 py-3 rounded-full text-slate-900 font-extrabold text-xs shadow-md shadow-orange-100 hover:shadow-lg active:scale-98 transition-all"
        >
          {buttonText}
        </a>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mt-1">
          <span>{signupPromptText.split('؟')[0] + '؟'}</span>
          <a href={signupLink} style={{ color: accentColor }} className="hover:underline transition-colors">
            {signupPromptText.includes('؟') ? signupPromptText.split('؟')[1].trim() : 'ابدأ من هنا'}
          </a>
        </div>
      </div>
    </section>
  );
}
