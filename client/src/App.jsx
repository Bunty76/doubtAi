import React, { useState, useEffect } from 'react';
import { askDoubt, getHistory } from './services/api';
import { Send, BookOpen, History, Loader2, Sparkles, User, Bot, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Geography', 'Literature', 'General'];

function App() {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('General');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDoubt, setCurrentDoubt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error('History fetch failed', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const data = await askDoubt(question, subject);
      setCurrentDoubt(data);
      setHistory([data, ...history]);
      setQuestion('');
    } catch (error) {
      alert('Failed to get answer. Make sure backend is running and API key is set.');
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-inter">
      {/* Sidebar */}
      <aside className="w-80 glass border-r flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-accent/20 text-accent">
              <Sparkles size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">DoubtSolver AI</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search past doubts..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex items-center gap-2 px-2 mb-4 text-xs font-semibold text-white/40 uppercase tracking-wider">
            <History size={14} />
            <span>Recent Doubts</span>
          </div>
          
          {filteredHistory.map((item) => (
            <button
              key={item._id}
              onClick={() => setCurrentDoubt(item)}
              className={cn(
                "w-full text-left p-3 rounded-xl transition-all group relative overflow-hidden",
                currentDoubt?._id === item._id ? "bg-accent/10 border border-accent/20" : "hover:bg-white/5 border border-transparent"
              )}
            >
              <p className="text-sm font-medium truncate mb-1">{item.question}</p>
              <p className="text-xs text-white/40 truncate">{item.subject}</p>
            </button>
          ))}
          
          {filteredHistory.length === 0 && (
            <div className="text-center py-10 text-white/20">
              <p className="text-sm">No doubts found</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="p-4 lg:p-6 border-b border-white/10 flex items-center justify-between glass">
          <div className="flex items-center gap-4">
             <div className="lg:hidden p-2 rounded-lg bg-accent/20 text-accent">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-semibold">{currentDoubt ? 'Doubt Detail' : 'Ask a Doubt'}</h2>
              <p className="text-xs text-white/40">{subject} • AI Model: Gemini 2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {currentDoubt ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Question */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/40 font-medium">You</p>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-2xl">
                      <p className="text-lg leading-relaxed">{currentDoubt.question}</p>
                    </div>
                  </div>
                </div>

                {/* AI Answer */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="text-sm text-accent font-semibold">DoubtSolver AI</p>
                    <div className="p-6 rounded-2xl glass-card space-y-4 prose prose-invert max-w-none">
                       <p className="whitespace-pre-wrap leading-relaxed text-white/90">
                         {currentDoubt.answer}
                       </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="p-4 rounded-2xl bg-accent/10 text-accent animate-pulse">
                  <Sparkles size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">What are we learning today?</h3>
                  <p className="text-white/40 max-w-md mx-auto">
                    Type your doubt below and our AI will help you understand even the most complex concepts.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  {['Newton\'s Laws', 'Photosynthesis', 'React Hooks', 'Trigonometry'].map(suggest => (
                    <button 
                      key={suggest}
                      onClick={() => setQuestion(suggest)}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all text-sm text-white/60"
                    >
                      "{suggest}"
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative glass-card rounded-2xl p-2 flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Ask your doubt here..."
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 p-4 text-lg"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl transition-all flex items-center gap-2 font-bold shadow-lg shadow-accent/20"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Ask AI</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>
            <p className="text-center text-[10px] text-white/20 mt-4 uppercase tracking-widest font-bold">
              Powered by OpenRouter & Gemini 2.0 Flash
            </p>
          </div>
        </div>

        {/* Back to New Chat button */}
        {currentDoubt && (
          <button 
            onClick={() => setCurrentDoubt(null)}
            className="absolute top-20 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            title="New Question"
          >
            <History size={20} className="rotate-180" />
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
