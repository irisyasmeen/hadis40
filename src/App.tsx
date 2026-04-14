/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Type, ChevronLeft, ChevronRight, X, BookOpen, Info, Volume2, VolumeX, Play, Pause, Star, Sparkles, Moon, Sun, Share2, Copy, Shuffle, Heart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { hadiths, type Hadith } from './data/hadiths';

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [view, setView] = useState<'landing' | 'reader'>('landing');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [fontSize, setFontSize] = useState(24); // Base font size for Arabic
  const [showInfo, setShowInfo] = useState(false);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      }
    } catch (e) {
      console.error('DarkMode init error:', e);
    }
    return false;
  });

  // Favorites state
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
      }
    } catch (e) {
      console.error('Favorites init error:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Favorites save error:', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      console.error('Theme effect error:', e);
    }
  }, [isDarkMode]);
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<'arabic' | 'malay' | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // AI Insights state
  const [aiInsights, setAiInsights] = useState<Record<number, string>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('ai_insights');
        return saved ? JSON.parse(saved) : {};
      }
    } catch (e) {
      console.error('AI Insights init error:', e);
    }
    return {};
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ai_insights', JSON.stringify(aiInsights));
    } catch (e) {
      console.error('AI Insights save error:', e);
    }
  }, [aiInsights]);

  const tabsRef = useRef<HTMLDivElement>(null);

  // Stop speech when changing hadith or view
  useEffect(() => {
    stopSpeech();
  }, [selectedIndex, view]);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setAudioMode(null);
  };

  const speak = (text: string, lang: string, mode: 'arabic' | 'malay') => {
    if (isPlaying && audioMode === mode) {
      stopSpeech();
      return;
    }

    stopSpeech();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    // Try to find a better voice for the language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang));
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      setIsPlaying(false);
      setAudioMode(null);
    };

    speechRef.current = utterance;
    setIsPlaying(true);
    setAudioMode(mode);
    window.speechSynthesis.speak(utterance);
  };

  // Filter hadiths based on search query
  const filteredHadiths = useMemo(() => {
    if (!searchQuery) return hadiths;
    const query = searchQuery.toLowerCase();
    return hadiths.filter(h => 
      h.title.toLowerCase().includes(query) || 
      h.translation.toLowerCase().includes(query) ||
      h.narrator.toLowerCase().includes(query) ||
      h.id.toString() === query
    );
  }, [searchQuery]);

  const currentHadith = hadiths[selectedIndex];

  // Scroll active tab into view
  useEffect(() => {
    if (view === 'reader' && tabsRef.current) {
      const activeTab = tabsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedIndex, view]);

  const handleNext = () => {
    if (selectedIndex < hadiths.length - 1) {
      setSelectedIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(prev => prev - 1);
    }
  };

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 48));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 18));

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Teks disalin ke papan klip!');
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  const shareHadith = async (hadith: Hadith) => {
    const text = `Hadis ${hadith.id}: ${hadith.title}\n\n${hadith.arabic}\n\nTerjemahan: ${hadith.translation}\n\nKongsi dari Koleksi 40 Hadis Nawawi`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hadis ${hadith.id}: ${hadith.title}`,
          text: text,
          url: window.location.href
        });
      } catch (err) {
        console.error('Gagal berkongsi:', err);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    setSelectedIndex(randomIndex);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateAIInsight = async (hadith: Hadith) => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      // Note: In a real app, use a secure backend or prompt user for key
      // For this demo, we use a placeholder or check env
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        alert('Sila tetapkan VITE_GEMINI_API_KEY dalam fail .env untuk menggunakan ciri AI.');
        setIsGenerating(false);
        return;
      }

      const { GoogleGenerativeAI } = await import('@google/genai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Anda adalah pakar pengajian Islam. Berikan huraian ringkas murni dan pengajaran utama (3-4 mata) dalam Bahasa Melayu untuk Hadis berikut:\n\n` +
        `Tajuk: ${hadith.title}\n` +
        `Teks: ${hadith.arabic}\n` +
        `Terjemahan: ${hadith.translation}\n\n` +
        `Format: Berikan ulasan ringkas (1 perenggan) diikuti dengan senarai "Pengajaran Utama".`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setAiInsights(prev => ({ ...prev, [hadith.id]: text }));
    } catch (err) {
      console.error('AI Error:', err);
      alert('Gagal menjana maklumat AI. Sila cuba sebentar lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans selection:bg-[#064E3B]/20 transition-colors duration-300 flex flex-col">
        {/* Floating Controls */}
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={handleRandom}
            className="p-4 bg-white dark:bg-[#1E293B] hover:bg-[#064E3B]/5 dark:hover:bg-[#064E3B]/20 text-[#064E3B] dark:text-[#FDE68A] rounded-2xl shadow-xl transition-all active:scale-95 border border-[#064E3B]/10 dark:border-white/10"
            title="Hadis Rawak"
          >
            <Shuffle className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-4 bg-white dark:bg-[#1E293B] hover:bg-[#064E3B]/5 dark:hover:bg-[#064E3B]/20 text-[#064E3B] dark:text-[#FDE68A] rounded-2xl shadow-xl transition-all active:scale-95 border border-[#064E3B]/10 dark:border-white/10"
            title={isDarkMode ? 'Mod Terang' : 'Mod Gelap'}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto w-full pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12 w-full"
          >
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-[#064E3B] to-[#065F46] dark:from-[#065F46] dark:to-[#064E3B] rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
                <BookOpen className="w-16 h-16 text-[#FDE68A]" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-8 h-8 text-[#B45309] dark:text-[#FDE68A]" />
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#064E3B] dark:text-[#FDE68A] tracking-tight leading-none">
                40 Hadis <br />
                <span className="text-[#B45309] dark:text-[#C2410C] italic font-medium">Nawawi</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#064E3B]/70 dark:text-white/60 max-w-2xl mx-auto leading-relaxed font-medium">
                Koleksi hadis-hadis pilihan yang membentuk peribadi Muslim sejati.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button
                onClick={() => setView('reader')}
                className="group relative w-full sm:w-auto px-12 py-6 bg-[#064E3B] dark:bg-[#065F46] text-white rounded-2xl font-bold text-xl shadow-2xl shadow-[#064E3B]/30 hover:bg-[#065F46] dark:hover:bg-[#059669] transition-all active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Mula Membaca <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <button
                onClick={() => setShowInfo(true)}
                className="w-full sm:w-auto px-12 py-6 bg-white dark:bg-white/5 text-[#064E3B] dark:text-white border-2 border-[#064E3B]/10 dark:border-white/10 rounded-2xl font-bold text-xl hover:bg-[#064E3B]/5 dark:hover:bg-white/10 transition-all shadow-lg"
              >
                Mengenai Hadis
              </button>
            </div>

            <div className="pt-20 space-y-10 w-full">
              <div className="flex items-center gap-4 px-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#064E3B]/20 dark:to-white/20" />
                <h2 className="text-3xl font-serif font-bold text-[#064E3B] dark:text-[#FDE68A] px-4">Senarai Hadis</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#064E3B]/20 dark:to-white/20" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {hadiths.map((h, idx) => (
                  <motion.button
                    key={h.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.05, 1) }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setView('reader');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-[32px] border border-[#064E3B]/5 dark:border-white/5 text-left hover:shadow-2xl hover:border-[#064E3B]/20 dark:hover:border-white/20 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#064E3B]/5 dark:bg-white/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:bg-[#064E3B]/10 dark:group-hover:bg-white/10 transition-colors" />
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-[#064E3B] to-[#065F46] rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                      <span className="font-bold text-2xl text-[#FDE68A]">{h.id}</span>
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#064E3B] dark:text-white text-xl truncate group-hover:text-[#B45309] dark:group-hover:text-[#FDE68A] transition-colors">{h.title}</h3>
                        {favorites.includes(h.id) && <Heart className="w-4 h-4 text-[#B45309] fill-[#B45309]" />}
                      </div>
                      <p className="text-sm text-[#064E3B]/50 dark:text-white/40 line-clamp-1 font-medium italic">
                        {h.narrator}
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#064E3B]/20 dark:text-white/20 group-hover:text-[#064E3B] dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </main>

        <footer className="p-12 text-center bg-white/50 dark:bg-black/20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#064E3B]/5 dark:bg-white/5 rounded-full text-[#064E3B]/60 dark:text-white/40 text-sm font-bold">
            <Star className="w-4 h-4 text-[#B45309] dark:text-[#FDE68A]" />
            <span>© 2026 Koleksi 40 Hadis Arba'in Nawawi</span>
            <Star className="w-4 h-4 text-[#B45309] dark:text-[#FDE68A]" />
          </div>
        </footer>

        {/* Info Modal reuse */}
        <AnimatePresence>
          {showInfo && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowInfo(false)}
                className="absolute inset-0 bg-[#064E3B]/40 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl border border-[#064E3B]/10"
              >
                <button 
                  onClick={() => setShowInfo(false)}
                  className="absolute top-8 right-8 p-2 hover:bg-[#064E3B]/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-[#064E3B]" />
                </button>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#064E3B]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <BookOpen className="w-10 h-10 text-[#064E3B]" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#064E3B] mb-4">Mengenai Aplikasi</h3>
                  <div className="space-y-4 text-[#064E3B]/70 leading-relaxed mb-10 text-lg">
                    <p>
                      Aplikasi ini mengandungi koleksi 40 Hadis Arba'in Nawawi, kompilasi hadis yang disusun oleh Imam An-Nawawi.
                    </p>
                    <p>
                      Setiap hadis disertakan dengan teks Arab asli, terjemahan Bahasa Melayu, dan narasi audio untuk memudahkan pembelajaran.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowInfo(false)}
                    className="w-full py-5 bg-[#064E3B] text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-[#065F46] transition-all active:scale-95"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&display=swap');
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans selection:bg-[#064E3B]/20 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border-b border-[#064E3B]/10 dark:border-white/10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('landing')}
            className="p-2.5 hover:bg-[#064E3B]/5 dark:hover:bg-white/5 rounded-2xl transition-all active:scale-90 text-[#064E3B] dark:text-[#FDE68A]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#064E3B] rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-[#FDE68A]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#064E3B] dark:text-[#FDE68A] font-serif">40 Hadis</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 hover:bg-[#064E3B]/5 dark:hover:bg-white/5 rounded-2xl transition-all text-[#064E3B] dark:text-[#FDE68A]"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          <button 
            onClick={() => setIsSearching(!isSearching)}
            className={cn(
              "p-2.5 rounded-2xl transition-all active:scale-90",
              isSearching 
                ? "bg-[#064E3B] text-white" 
                : "hover:bg-[#064E3B]/5 dark:hover:bg-white/5 text-[#064E3B] dark:text-[#FDE68A]"
            )}
            aria-label="Cari"
          >
            <Search className="w-6 h-6" />
          </button>
          
          <div className="hidden md:flex items-center bg-[#064E3B]/5 dark:bg-white/5 rounded-2xl p-1">
            <button 
              onClick={decreaseFontSize}
              className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 rounded-xl transition-all text-sm font-bold text-[#064E3B] dark:text-[#FDE68A]"
            >
              A-
            </button>
            <div className="w-px h-4 bg-[#064E3B]/10 dark:bg-white/10 mx-1" />
            <button 
              onClick={increaseFontSize}
              className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 rounded-xl transition-all text-xl font-bold text-[#064E3B] dark:text-[#FDE68A]"
            >
              A+
            </button>
          </div>

          <button 
            onClick={() => setShowInfo(true)}
            className="p-2.5 hover:bg-[#064E3B]/5 dark:hover:bg-white/5 rounded-2xl transition-all text-[#064E3B] dark:text-[#FDE68A]"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-[73px] z-40 bg-white border-b border-[#064E3B]/10 p-6 shadow-2xl"
          >
            <div className="relative max-w-3xl mx-auto">
              <input 
                type="text"
                placeholder="Cari tajuk, isi, atau nombor hadis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-5 bg-[#064E3B]/5 dark:bg-white/5 border-2 border-transparent focus:border-[#064E3B]/20 dark:focus:border-[#FDE68A]/20 rounded-[24px] transition-all outline-none text-lg font-medium text-[#064E3B] dark:text-white placeholder-[#064E3B]/40 dark:placeholder-white/40"
                autoFocus
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#064E3B]/40 dark:text-white/40" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-[#064E3B]/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#064E3B]" />
                </button>
              )}
            </div>
            
            {searchQuery && (
              <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-3 max-w-3xl mx-auto custom-scrollbar">
                {filteredHadiths.length > 0 ? (
                  filteredHadiths.map(h => (
                    <button
                      key={h.id}
                      onClick={() => {
                        setSelectedIndex(hadiths.findIndex(orig => orig.id === h.id));
                        setIsSearching(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-5 hover:bg-[#064E3B]/5 dark:hover:bg-white/5 rounded-2xl transition-all flex items-center gap-5 group border border-transparent hover:border-[#064E3B]/10 dark:hover:border-white/10"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-[#064E3B] dark:bg-[#065F46] text-[#FDE68A] rounded-xl text-lg font-bold shrink-0 shadow-md">
                        {h.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-lg text-[#064E3B] dark:text-white group-hover:text-[#B45309] dark:group-hover:text-[#FDE68A] transition-colors truncate">{h.title}</p>
                        <p className="text-sm text-[#064E3B]/50 dark:text-white/40 font-medium truncate italic">{h.narrator}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-[#064E3B]/10 mx-auto mb-4" />
                    <p className="text-[#064E3B]/40 italic text-lg">Tiada hadis ditemui</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs Navigation */}
      <nav className="bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-[#064E3B]/10 dark:border-white/10 overflow-x-auto no-scrollbar sticky top-[73px] z-30" ref={tabsRef}>
        <div className="flex px-4 min-w-max gap-2 py-2">
          {hadiths.map((h, idx) => (
            <button
              key={h.id}
              data-index={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "px-6 py-3 text-sm font-bold transition-all relative rounded-xl",
                selectedIndex === idx 
                  ? "bg-[#064E3B] text-white shadow-lg shadow-[#064E3B]/20" 
                  : "text-[#064E3B]/40 dark:text-white/40 hover:text-[#064E3B]/60 dark:hover:text-white/60 hover:bg-[#064E3B]/5 dark:hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-2">
                {favorites.includes(h.id) && <Heart className="w-3 h-3 fill-current" />}
                Hadis {h.id}
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-10 pb-40">
        <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-white/5 rounded-[48px] shadow-2xl border border-[#064E3B]/5 dark:border-white/5 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#064E3B]/5 dark:from-white/5 to-transparent rounded-bl-[200px] pointer-events-none" />
            
            <div className="p-8 md:p-16 relative z-10">
              {/* Title & Narrator */}
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#064E3B]/5 dark:bg-white/5 text-[#064E3B] dark:text-[#FDE68A] rounded-full text-sm font-extrabold uppercase tracking-[0.2em] mb-6">
                  <Sparkles className="w-4 h-4 text-[#B45309] dark:text-[#FDE68A]" />
                  Hadis {currentHadith.id}
                  <Sparkles className="w-4 h-4 text-[#B45309] dark:text-[#FDE68A]" />
                </div>
                
                <div className="flex items-center justify-between mb-8">
                   <button 
                    onClick={() => toggleFavorite(currentHadith.id)}
                    className={cn(
                      "p-4 rounded-3xl transition-all active:scale-90 shadow-xl",
                      favorites.includes(currentHadith.id)
                        ? "bg-[#B45309] text-white"
                        : "bg-white dark:bg-white/5 text-[#B45309] border-2 border-[#B45309]/20"
                    )}
                  >
                    <Heart className={cn("w-7 h-7", favorites.includes(currentHadith.id) && "fill-current")} />
                  </button>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => copyToClipboard(`${currentHadith.arabic}\n\n${currentHadith.translation}`)}
                      className="p-4 bg-white dark:bg-white/5 text-[#064E3B] dark:text-[#FDE68A] border-2 border-[#064E3B]/10 dark:border-white/10 rounded-3xl transition-all active:scale-90 shadow-xl"
                    >
                      <Copy className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => shareHadith(currentHadith)}
                      className="p-4 bg-white dark:bg-white/5 text-[#064E3B] dark:text-[#FDE68A] border-2 border-[#064E3B]/10 dark:border-white/10 rounded-3xl transition-all active:scale-90 shadow-xl"
                    >
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#064E3B] dark:text-white leading-tight break-words mb-6">
                  {currentHadith.title}
                </h2>
                <div className="flex items-center justify-center gap-3 text-[#064E3B]/60 dark:text-white/40">
                  <div className="h-px w-8 bg-[#064E3B]/20 dark:bg-white/20" />
                  <p className="text-sm md:text-base font-medium italic">
                    Diriwayatkan oleh: {currentHadith.narrator}
                  </p>
                  <div className="h-px w-8 bg-[#064E3B]/20 dark:bg-white/20" />
                </div>

              {/* Arabic Text */}
              <div className="mb-16 relative">
                <div className="flex justify-end mb-6">
                  <button 
                    onClick={() => speak(currentHadith.arabic, 'ar-SA', 'arabic')}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95",
                      isPlaying && audioMode === 'arabic' 
                        ? "bg-[#064E3B] text-white ring-8 ring-[#064E3B]/10 dark:ring-white/10" 
                        : "bg-white dark:bg-white/5 text-[#064E3B] dark:text-[#FDE68A] border-2 border-[#064E3B]/10 dark:border-white/10 hover:border-[#064E3B]/30"
                    )}
                  >
                    {isPlaying && audioMode === 'arabic' ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    {isPlaying && audioMode === 'arabic' ? 'Berhenti' : 'Dengar Arab'}
                  </button>
                </div>
                <div className="bg-[#064E3B]/5 dark:bg-black/20 p-8 md:p-12 rounded-[40px] border-2 border-[#064E3B]/5 dark:border-white/5 relative overflow-hidden group shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 dark:from-white/5 to-transparent pointer-events-none" />
                  <p 
                    className="font-serif leading-[2.5] text-right dir-rtl break-words relative z-10 text-[#064E3B] dark:text-white"
                    style={{ 
                      fontSize: `${fontSize}px`,
                      fontFamily: "'Amiri', serif",
                    }}
                  >
                    {currentHadith.arabic}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-6 mb-16">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#064E3B]/20 dark:to-white/20" />
                <div className="w-4 h-4 rotate-45 border-2 border-[#B45309] dark:border-[#FDE68A] bg-white dark:bg-[#0F172A]" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#064E3B]/20 dark:to-white/20" />
              </div>

              {/* Translation */}
              <div className="space-y-8 relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#064E3B]/30 dark:text-white/30">Terjemahan</h3>
                  <button 
                    onClick={() => speak(currentHadith.translation, 'ms-MY', 'malay')}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95",
                      isPlaying && audioMode === 'malay' 
                        ? "bg-[#064E3B] text-white ring-8 ring-[#064E3B]/10 dark:ring-white/10" 
                        : "bg-white dark:bg-white/5 text-[#064E3B] dark:text-[#FDE68A] border-2 border-[#064E3B]/10 dark:border-white/10 hover:border-[#064E3B]/30"
                    )}
                  >
                    {isPlaying && audioMode === 'malay' ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    {isPlaying && audioMode === 'malay' ? 'Berhenti' : 'Dengar Melayu'}
                  </button>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-[#064E3B]/80 dark:text-white/80 font-medium italic">
                  "{currentHadith.translation}"
                </p>

                {/* AI Insights Section */}
                <div className="mt-16 pt-16 border-t border-[#064E3B]/10 dark:border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[#064E3B] dark:text-[#FDE68A]">
                        <Sparkles className="w-6 h-6" />
                        <h3 className="text-2xl font-serif font-bold">Tadabbur & Pengajaran AI</h3>
                      </div>
                      <p className="text-sm text-[#064E3B]/60 dark:text-white/40">Jana ulasan dan pengajaran hadis menggunakan AI</p>
                    </div>
                    
                    <button 
                      onClick={() => generateAIInsight(currentHadith)}
                      disabled={isGenerating}
                      className={cn(
                        "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 disabled:opacity-50",
                        aiInsights[currentHadith.id] 
                          ? "bg-[#064E3B]/5 dark:bg-white/5 text-[#064E3B] dark:text-[#FDE68A] border-2 border-[#064E3B]/10" 
                          : "bg-gradient-to-r from-[#064E3B] to-[#065F46] text-white"
                      )}
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Menjana...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5" />
                          <span>{aiInsights[currentHadith.id] ? 'Jana Semula' : 'Jana Tadabbur'}</span>
                        </div>
                      )}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {aiInsights[currentHadith.id] ? (
                      <motion.div
                        key="insight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#064E3B]/5 dark:bg-white/5 p-8 md:p-10 rounded-[40px] border border-[#064E3B]/10 dark:border-white/10"
                      >
                        <div className="prose dark:prose-invert max-w-none text-[#064E3B] dark:text-white/90 leading-relaxed space-y-4">
                          {aiInsights[currentHadith.id].split('\n').map((line, i) => (
                             <p key={i} className={cn(
                               line.startsWith('Pengajaran Utama') ? "font-bold text-xl mt-6 block" : "",
                               line.trim().startsWith('*') || line.trim().startsWith('-') ? "pl-4 border-l-2 border-[#064E3B]/20 ml-2" : ""
                             )}>
                               {line.replace(/^\*+|-+/, '').trim()}
                             </p>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      !isGenerating && (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-20 border-2 border-dashed border-[#064E3B]/10 dark:border-white/10 rounded-[40px]"
                        >
                          <Sparkles className="w-12 h-12 text-[#064E3B]/20 dark:text-white/20 mx-auto mb-4" />
                          <p className="text-[#064E3B]/40 dark:text-white/40 italic">Klik butang di atas untuk menjana ulasan AI</p>
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FDFCF7] via-[#FDFCF7]/95 to-transparent pointer-events-none z-40">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-white dark:bg-white/5 border-2 border-[#064E3B]/10 dark:border-white/10 rounded-[24px] shadow-2xl hover:bg-[#064E3B]/5 dark:hover:bg-white/10 transition-all disabled:opacity-30 disabled:pointer-events-none text-lg font-bold text-[#064E3B] dark:text-[#FDE68A]"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Sebelumnya</span>
          </button>
          
          {selectedIndex === hadiths.length - 1 ? (
            <button
              onClick={() => {
                setSelectedIndex(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#B45309] text-white rounded-[24px] shadow-2xl hover:bg-[#92400E] transition-all text-lg font-bold"
            >
              <span>Ke Hadis 1</span>
              <BookOpen className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#064E3B] text-white rounded-[24px] shadow-2xl hover:bg-[#065F46] transition-all text-lg font-bold"
            >
              <span>Seterusnya</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </footer>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfo(false)}
              className="absolute inset-0 bg-[#064E3B]/40 backdrop-blur-md"
            />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-[40px] p-10 shadow-2xl border border-[#064E3B]/10 dark:border-white/10"
              >
                <button 
                  onClick={() => setShowInfo(false)}
                  className="absolute top-8 right-8 p-2 hover:bg-[#064E3B]/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-[#064E3B] dark:text-[#FDE68A]" />
                </button>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#064E3B]/10 dark:bg-[#FDE68A]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <BookOpen className="w-10 h-10 text-[#064E3B] dark:text-[#FDE68A]" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#064E3B] dark:text-[#FDE68A] mb-4">Mengenai Aplikasi</h3>
                  <div className="space-y-4 text-[#064E3B]/70 dark:text-white/60 leading-relaxed mb-10 text-lg text-left">
                    <p>
                      Aplikasi ini mengandungi koleksi 40 Hadis Arba'in Nawawi, kompilasi hadis yang disusun oleh Imam An-Nawawi.
                    </p>
                    <p>
                      Satu koleksi yang merangkumi asas-asas agama Islam, akhlak, dan peribadi mukmin.
                    </p>
                    <p>
                      Ciri baharu: <br />
                      • Simpan hadis kegemaran ❤️ <br />
                      • Mod Gelap 🌙 <br />
                      • Perkongsian pantas 📲 <br />
                      • Hadis Rawak 🎲
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowInfo(false)}
                    className="w-full py-5 bg-[#064E3B] dark:bg-[#065F46] text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-[#065F46] dark:hover:bg-[#059669] transition-all active:scale-95"
                  >
                    Faham
                  </button>
                </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .dir-rtl {
          direction: rtl;
        }
        body {
          overscroll-behavior-y: none;
          background-color: #FDFCF7;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #064E3B20;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #064E3B40;
        }
      `}} />
    </div>
  );
}
