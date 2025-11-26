import React, { useState } from 'react';
import { Baby, Calendar, User, Wand2, RefreshCw, Heart, AlertCircle } from 'lucide-react';
import { FormData, Gender, GeminiResponse } from './types';
import { generateNames } from './services/geminiService';
import { InputField } from './components/InputField';
import { NameCard } from './components/NameCard';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fatherName: '',
    motherName: '',
    birthDate: new Date().toISOString().split('T')[0],
    gender: Gender.NEUTRAL,
    style: 'เท่ๆ, ทันสมัย, ความหมายดี'
  });

  const [result, setResult] = useState<GeminiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id === 'genderSelect' ? 'gender' : id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fatherName || !formData.motherName) {
      setError("กรุณากรอกชื่อเล่นคุณพ่อและคุณแม่");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateNames(formData);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      if (err.message === "API_KEY_MISSING") {
        setError("ไม่พบ API Key: กรุณาตั้งค่า 'API_KEY' ใน Environment Variables หรือไฟล์ .env ของคุณ");
      } else {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI กรุณาลองใหม่อีกครั้ง");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl text-white shadow-lg">
              <Baby size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                BabyName AI
              </h1>
              <p className="text-xs text-slate-500 font-medium">ตั้งชื่อลูกมงคลด้วย AI</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        
        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center text-slate-700">
                <User className="mr-2 text-primary" /> ข้อมูลสำหรับวิเคราะห์
              </h2>
              
              <form onSubmit={handleSubmit}>
                <InputField
                  id="fatherName"
                  label="ชื่อเล่นคุณพ่อ"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  placeholder="เช่น กอล์ฟ"
                  icon={<User size={18} />}
                />

                <InputField
                  id="motherName"
                  label="ชื่อเล่นคุณแม่"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  placeholder="เช่น เมย์"
                  icon={<Heart size={18} />}
                />

                <InputField
                  id="birthDate"
                  label="วันเกิด (หรือกำหนดคลอด)"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  icon={<Calendar size={18} />}
                />

                <InputField
                  id="genderSelect"
                  label="เพศ"
                  type="select"
                  value={formData.gender}
                  onChange={handleInputChange}
                  options={[Gender.MALE, Gender.FEMALE, Gender.NEUTRAL]}
                  icon={<Baby size={18} />}
                />

                 <div className="mb-6">
                  <label htmlFor="style" className="block text-sm font-medium text-slate-700 mb-1 pl-1">
                    สไตล์ชื่อที่ชอบ
                  </label>
                  <input
                    id="style"
                    type="text"
                    value={formData.style}
                    onChange={handleInputChange}
                    placeholder="เช่น เท่ๆ, อินเตอร์, 2 พยางค์"
                    className="w-full pl-4 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" />
                      <span>กำลังวิเคราะห์ดวงดาว...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 />
                      <span>สร้างชื่อมงคล</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Result Section */}
          <div className="md:col-span-8 lg:col-span-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl mb-6 shadow-sm animate-fade-in-down flex items-start space-x-3">
                <AlertCircle className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[400px] border-2 border-dashed border-slate-300 rounded-3xl bg-white/30">
                <Baby size={64} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">กรอกข้อมูลแล้วกดปุ่มเพื่อเริ่มตั้งชื่อ</p>
                <p className="text-sm">ระบบจะวิเคราะห์ตามหลักทักษาปกรณ์</p>
              </div>
            )}

            {result && (
              <div className="animate-fade-in-up">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Wand2 size={120} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">บทวิเคราะห์จาก AI</h2>
                  <p className="text-indigo-100 leading-relaxed max-w-2xl relative z-10">
                    {result.summary}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {result.suggestions.map((nameData, idx) => (
                    <NameCard key={idx} data={nameData} index={idx} />
                  ))}
                </div>
              </div>
            )}
            
            {loading && (
              <div className="grid gap-6 md:grid-cols-2 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/50 h-64 rounded-2xl"></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;