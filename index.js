import React, { useState } from 'react';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // الخلفية المتدرجة التي تبرز تأثير الزجاج
    <div 
      dir="rtl" 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 font-sans"
    >
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <AddQuestionForm />
      )}
    </div>
  );
}

// ----------------------------------------
// 1. مكون تسجيل دخول المشرف
// ----------------------------------------
function LoginForm({ onLogin }) {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">
      <div className="text-center mb-8">
        <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-inner">
          <span className="text-3xl">👨‍💻</span>
        </div>
        <h2 className="text-2xl font-bold text-white">بوابة المشرف</h2>
        <p className="text-purple-200 mt-2 text-sm">قم بتسجيل الدخول لإدارة الاختبارات</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">البريد الإلكتروني</label>
          <input 
            type="email" 
            placeholder="admin@example.com"
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
            required 
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">كلمة المرور</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
            required 
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-95 mt-4"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
}

// ----------------------------------------
// 2. مكون إضافة الأسئلة (لوحة التحكم)
// ----------------------------------------
function AddQuestionForm() {
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-8">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <span>📝</span> إضافة سؤال جديد
        </h2>
        <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 text-sm rounded-full border border-emerald-500/30">
          متصل
        </span>
      </div>

      <form className="space-y-6">
        {/* نص السؤال */}
        <div>
          <label className="block text-white/90 text-sm font-medium mb-2">نص السؤال</label>
          <textarea 
            rows="3"
            placeholder="اكتب السؤال هنا..."
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all resize-none"
          ></textarea>
        </div>

        {/* الخيارات */}
        <div>
          <label className="block text-white/90 text-sm font-medium mb-3">الخيارات (حدد الإجابة الصحيحة)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((opt, index) => (
              <div key={index} className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder={`الخيار رقم ${index + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl pr-12 pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
                {/* زر اختيار الإجابة الصحيحة (Radio Button) */}
                <input 
                  type="radio" 
                  name="correctAnswer" 
                  value={index}
                  className="absolute right-4 w-5 h-5 accent-emerald-400 cursor-pointer"
                  title="تحديد كإجابة صحيحة"
                />
              </div>
            ))}
          </div>
        </div>

        {/* أزرار الحفظ */}
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <button 
            type="button"
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-95"
          >
            حفظ ورفع لـ Firebase
          </button>
          <button 
            type="button"
            className="px-6 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium py-3 rounded-xl transition"
          >
            مسح
          </button>
        </div>
      </form>
    </div>
  );
}
