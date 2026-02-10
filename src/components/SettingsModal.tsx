import React, { useState } from 'react';
import { X, Settings, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  token: string;
  onSave: (token: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ token, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localToken, setLocalToken] = useState(token);

  const handleSave = () => {
    onSave(localToken);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/60 transition-colors z-50 text-gray-700"
        title="Settings"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold text-gray-800 mb-4">設定</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spotify Access Token
                </label>
                <input
                  type="password"
                  value={localToken}
                  onChange={(e) => setLocalToken(e.target.value)}
                  placeholder="Paste your Spotify Web API Token here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm"
                />
                <div className="mt-2 text-xs text-gray-500">
                  <p>正確な楽曲検索にはSpotifyトークンが必要です。</p>
                  <a 
                    href="https://developer.spotify.com/console/get-search-item/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline mt-1"
                  >
                    ここから取得 (Get Token) <ExternalLink size={10} />
                  </a>
                  <p className="mt-1">※ 設定しない場合、AIが生成した検索ワードを表示し、デモ楽曲を再生します。</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsModal;