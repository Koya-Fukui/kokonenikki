import React, { useState, useEffect } from 'react';
import { X, BookOpen, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiaryLog } from '../types';
import { fetchRecentLogs, fetchAllLogs } from '../services/supabaseClient';

interface HistoryModalProps {
  onClose?: () => void; // Optional callback
}

const HistoryModal: React.FC<HistoryModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<DiaryLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Load logs when modal opens
  useEffect(() => {
    if (isOpen) {
      loadRecentLogs();
    }
  }, [isOpen]);

  const loadRecentLogs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRecentLogs();
      setLogs(data);
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    if (logs.length === 0) {
      alert("ダウンロードする日記がありません。");
      return;
    }
    
    setIsDownloading(true);
    try {
      const allLogs = await fetchAllLogs();
      
      // Format text file
      const textContent = allLogs.map(log => {
        const date = new Date(log.created_at).toLocaleString('ja-JP');
        const emotions = `Joy:${log.emotions.joy} / Sad:${log.emotions.sad} / Calm:${log.emotions.calm} / Energy:${log.emotions.energy} / Stress:${log.emotions.stress}`;
        return `【日付】${date}\n【感情スコア】${emotions}\n【本文】\n${log.content}\n\n--------------------------------------------------\n`;
      }).join('\n');

      // Create Blob and Download
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diary_all_${new Date().toISOString().slice(0,10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed", error);
      alert("ダウンロードに失敗しました。");
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (onClose && isOpen) onClose(); 
  };

  return (
    <>
      <button
        onClick={toggleOpen}
        className="fixed top-4 right-4 p-3 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/60 transition-colors z-50 text-gray-700 shadow-sm"
        title="過去の日記ログ"
      >
        <BookOpen size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-100/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#faf9f6] rounded-xl shadow-2xl w-full max-w-lg relative flex flex-col max-h-[85vh] overflow-hidden border border-stone-200"
            >
              {/* Header */}
              <div className="p-6 pb-2 flex items-center justify-between border-b border-stone-100">
                <div>
                   <h2 className="text-2xl text-stone-800 font-shippori font-bold tracking-wide">記憶の栞</h2>
                   <p className="text-xs text-stone-500 mt-1 font-shippori">これまでの心の軌跡</p>
                </div>
                <button
                  onClick={toggleOpen}
                  className="p-2 hover:bg-stone-200/50 rounded-full text-stone-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* List Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isLoading ? (
                  <div className="flex justify-center py-10 text-stone-400">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-stone-400 font-shippori">
                    <p>過去10日分の日記がここに記載されます</p>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {logs.map((log) => (
                      <li key={log.id} className="relative pl-6 border-l border-stone-300">
                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-stone-300 rounded-full border-2 border-[#faf9f6]"></div>
                        <p className="text-xs text-stone-500 font-serif mb-1">
                          {new Date(log.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                        </p>
                        <p className="text-sm text-stone-700 font-shippori leading-relaxed line-clamp-2 opacity-90">
                          {log.content}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer / Download Action */}
              <div className="p-6 bg-stone-50/80 border-t border-stone-200">
                <button
                  onClick={handleDownloadAll}
                  disabled={isDownloading || logs.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-stone-800 text-[#faf9f6] py-3 rounded-lg hover:bg-stone-700 transition-colors shadow-md font-shippori disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                  <span>全日記をダウンロード</span>
                </button>
                <p className="text-[10px] text-center text-stone-400 mt-3 font-light leading-relaxed">
                  ※ ダウンロードしたデータ（txt形式）を生成AIに入力することで、<br/>
                  長期的な感情の傾向や自己分析に役立てることができます。
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HistoryModal;