import React from 'react';
import { motion } from 'framer-motion';
import { MusicCategory } from '../types';

interface DiaryInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
  category: MusicCategory;
  onCategoryChange: (cat: MusicCategory) => void;
}

const DiaryInput: React.FC<DiaryInputProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  isAnalyzing,
  category,
  onCategoryChange
}) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col h-[85vh] md:h-auto justify-between md:justify-start md:gap-8 p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-light text-gray-800 tracking-widest mb-1">
            心音日記
          </h1>
          <p className="text-xs text-gray-500 tracking-wide">
            今の気持ちを言葉に
          </p>
        </div>

        <div className="flex-1 relative group mb-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isAnalyzing}
            placeholder="今日はどんな一日でしたか？..."
            className="w-full h-full min-h-[300px] bg-white/40 backdrop-blur-md rounded-3xl p-6 text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm resize-none transition-all duration-300 border border-white/30"
            style={{
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.05 )"
            }}
          />
        </div>
        
        {/* Controls Section */}
        <div className="space-y-6">
          {/* Toggle Switch */}
          <div className="bg-white/30 backdrop-blur-md p-1 rounded-full flex relative shadow-inner border border-white/20 max-w-xs mx-auto">
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm z-0"
              initial={false}
              animate={{
                x: category === 'J-Pop' ? 0 : '100%',
                width: '50%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => onCategoryChange('J-Pop')}
              className={`flex-1 relative z-10 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${category === 'J-Pop' ? 'text-black' : 'text-gray-500'}`}
            >
              J-Pop
            </button>
            <button
              onClick={() => onCategoryChange('Western')}
              className={`flex-1 relative z-10 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${category === 'Western' ? 'text-black' : 'text-gray-500'}`}
            >
              Western
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
             <button
              onClick={onSubmit}
              disabled={value.length < 5 || isAnalyzing}
              className={`
                w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
                ${value.length < 5 || isAnalyzing 
                  ? 'bg-white/50 cursor-not-allowed opacity-50' 
                  : 'bg-black text-white hover:scale-110 active:scale-95'}
              `}
            >
              {isAnalyzing ? (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              )}
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default DiaryInput;