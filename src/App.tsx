/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Type, ChevronLeft, ChevronRight, X, BookOpen, Info, Volume2, VolumeX, Play, Pause, Star, Sparkles } from 'lucide-react';
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
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<'arabic' | 'malay' | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-[#FDFCF7] text-[#0F172A] font-sans selection:bg-[#064E3B]/20 flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12 w-full"
          >
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-[#064E3B] to-[#065F46] rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
                <BookOpen className="w-16 h-16 text-[#FDE68A]" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-8 h-8 text-[#B45309]" />
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#064E3B] tracking-tight leading-none">
                40 Hadis <br />
                <span className="text-[#B45309] italic font-medium">Nawawi</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#064E3B]/70 max-w-2xl mx-auto leading-relaxed font-medium">
                Koleksi hadis-hadis pilihan yang membentuk peribadi Muslim sejati.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button
                onClick={() => setView('reader')}
                className="group relative w-full sm:w-auto px-12 py-6 bg-[#064E3B] text-white rounded-2xl font-bold text-xl shadow-2xl shadow-[#064E3B]/30 hover:bg-[#065F46] transition-all active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Mula Membaca <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <button
                onClick={() => setShowInfo(true)}
                className="w-full sm:w-auto px-12 py-6 bg-white text-[#064E3B] border-2 border-[#064E3B]/10 rounded-2xl font-bold text-xl hover:bg-[#064E3B]/5 transition-all shadow-lg"
              >
                Mengenai Hadis
              </button>
            </div>

            <div className="pt-20 space-y-10 w-full">
              <div className="flex items-center gap-4 px-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#064E3B]/20" />
                <h2 className="text-3xl font-serif font-bold text-[#064E3B] px-4">Senarai Hadis</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#064E3B]/20" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hadiths.map((h, idx) => (
                  <motion.button
                    key={h.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setView('reader');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-6 p-6 bg-white rounded-[32px] border border-[#064E3B]/5 text-left hover:shadow-2xl hover:border-[#064E3B]/20 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#064E3B]/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:bg-[#064E3B]/10 transition-colors" />
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-[#064E3B] to-[#065F46] rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                      <span className="font-bold text-2xl text-[#FDE68A]">{h.id}</span>
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="font-bold text-[#064E3B] text-xl mb-1 truncate group-hover:text-[#B45309] transition-colors">{h.title}</h3>
                      <p className="text-sm text-[#064E3B]/50 line-clamp-1 font-medium">
                        {h.narrator}
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#064E3B]/20 group-hover:text-[#064E3B] group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </main>

        <footer className="p-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#064E3B]/5 rounded-full text-[#064E3B]/60 text-sm font-bold">
            <Star className="w-4 h-4 text-[#B45309]" />
            <span>© 2026 Koleksi 40 Hadis Arba'in Nawawi</span>
            <Star className="w-4 h-4 text-[#B45309]" />
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
    <div className="min-h-screen bg-[#FDFCF7] text-[#0F172A] font-sans selection:bg-[#064E3B]/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#064E3B]/10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('landing')}
            className="p-2.5 hover:bg-[#064E3B]/5 rounded-2xl transition-all active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-[#064E3B]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#064E3B] rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-[#FDE68A]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#064E3B] font-serif">40 Hadis</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSearching(!isSearching)}
            className={cn(
              "p-2.5 rounded-2xl transition-all active:scale-90",
              isSearching ? "bg-[#064E3B] text-white" : "hover:bg-[#064E3B]/5 text-[#064E3B]"
            )}
            aria-label="Cari"
          >
            <Search className="w-6 h-6" />
          </button>
          
          <div className="flex items-center bg-[#064E3B]/5 rounded-2xl p-1">
            <button 
              onClick={decreaseFontSize}
              className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-sm font-bold text-[#064E3B]"
            >
              A-
            </button>
            <div className="w-px h-4 bg-[#064E3B]/10 mx-1" />
            <button 
              onClick={increaseFontSize}
              className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-xl font-bold text-[#064E3B]"
            >
              A+
            </button>
          </div>

          <button 
            onClick={() => setShowInfo(true)}
            className="p-2.5 hover:bg-[#064E3B]/5 rounded-2xl transition-all text-[#064E3B]"
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
                className="w-full pl-14 pr-12 py-5 bg-[#064E3B]/5 border-2 border-transparent focus:border-[#064E3B]/20 rounded-[24px] transition-all outline-none text-lg font-medium"
                autoFocus
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#064E3B]/40" />
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
                      className="w-full text-left p-5 hover:bg-[#064E3B]/5 rounded-2xl transition-all flex items-center gap-5 group border border-transparent hover:border-[#064E3B]/10"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-[#064E3B] text-[#FDE68A] rounded-xl text-lg font-bold shrink-0 shadow-md">
                        {h.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-lg text-[#064E3B] group-hover:text-[#B45309] transition-colors truncate">{h.title}</p>
                        <p className="text-sm text-[#064E3B]/50 font-medium truncate">{h.narrator}</p>
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
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#064E3B]/10 overflow-x-auto no-scrollbar sticky top-[73px] z-30" ref={tabsRef}>
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
                  : "text-[#064E3B]/40 hover:text-[#064E3B]/60 hover:bg-[#064E3B]/5"
              )}
            >
              Hadis {h.id}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-10 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[48px] shadow-2xl border border-[#064E3B]/5 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#064E3B]/5 to-transparent rounded-bl-[200px] pointer-events-none" />
            
            <div className="p-8 md:p-16 relative z-10">
              {/* Title & Narrator */}
              <div className="mb-12 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#064E3B]/5 text-[#064E3B] rounded-full text-sm font-extrabold uppercase tracking-[0.2em]">
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  Hadis {currentHadith.id}
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#064E3B] leading-tight break-words">
                  {currentHadith.title}
                </h2>
                <div className="flex items-center justify-center gap-3 text-[#064E3B]/60">
                  <div className="h-px w-8 bg-[#064E3B]/20" />
                  <p className="text-sm md:text-base font-medium italic">
                    Diriwayatkan oleh: {currentHadith.narrator}
                  </p>
                  <div className="h-px w-8 bg-[#064E3B]/20" />
                </div>
              </div>

              {/* Arabic Text */}
              <div className="mb-16 relative">
                <div className="flex justify-end mb-6">
                  <button 
                    onClick={() => speak(currentHadith.arabic, 'ar-SA', 'arabic')}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95",
                      isPlaying && audioMode === 'arabic' 
                        ? "bg-[#064E3B] text-white ring-8 ring-[#064E3B]/10" 
                        : "bg-white text-[#064E3B] border-2 border-[#064E3B]/10 hover:border-[#064E3B]/30"
                    )}
                  >
                    {isPlaying && audioMode === 'arabic' ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    {isPlaying && audioMode === 'arabic' ? 'Berhenti' : 'Dengar Arab'}
                  </button>
                </div>
                <div className="bg-[#064E3B]/5 p-8 md:p-12 rounded-[40px] border-2 border-[#064E3B]/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
                  <p 
                    className="font-serif leading-[2.5] text-right dir-rtl break-words relative z-10"
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
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#064E3B]/20" />
                <div className="w-4 h-4 rotate-45 border-2 border-[#B45309] bg-white" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#064E3B]/20" />
              </div>

              {/* Translation */}
              <div className="space-y-8 relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#064E3B]/30">Terjemahan</h3>
                  <button 
                    onClick={() => speak(currentHadith.translation, 'ms-MY', 'malay')}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95",
                      isPlaying && audioMode === 'malay' 
                        ? "bg-[#064E3B] text-white ring-8 ring-[#064E3B]/10" 
                        : "bg-white text-[#064E3B] border-2 border-[#064E3B]/10 hover:border-[#064E3B]/30"
                    )}
                  >
                    {isPlaying && audioMode === 'malay' ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    {isPlaying && audioMode === 'malay' ? 'Berhenti' : 'Dengar Melayu'}
                  </button>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-[#064E3B]/80 font-medium italic">
                  "{currentHadith.translation}"
                </p>
              </div>
            </div>
          </motion.div>
        </ AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FDFCF7] via-[#FDFCF7]/95 to-transparent pointer-events-none z-40">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-white border-2 border-[#064E3B]/10 rounded-[24px] shadow-2xl hover:bg-[#064E3B]/5 transition-all disabled:opacity-30 disabled:pointer-events-none text-lg font-bold text-[#064E3B]"
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
