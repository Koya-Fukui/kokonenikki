import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult, SpotifyTrack } from '../types';
import EmotionChart from './EmotionChart';
import SpotifyEmbed from './SpotifyEmbed';
import { ArrowLeft, ExternalLink, Youtube, Music } from 'lucide-react';

interface ResultViewProps {
  result: AnalysisResult;
  track: SpotifyTrack | null;
  youtubeVideoId: string | null;
  onReset: () => void;
  fallbackTrackId: string;
}

const ResultView: React.FC<ResultViewProps> = ({ result, track, youtubeVideoId, onReset, fallbackTrackId }) => {
  const accentColor = result.colors[0] || '#000000';
  
  // Music service links
  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(result.spotify_query)}`;
  const appleMusicUrl = `https://music.apple.com/jp/search?term=${encodeURIComponent(result.spotify_query)}`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(result.youtube_query)}`;
  
  // Use specific video ID if available (Reliable), otherwise fallback to search list (Unreliable but better than nothing)
  const youtubeEmbedUrl = youtubeVideoId 
    ? `https://www.youtube.com/embed/${youtubeVideoId}`
    : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(result.youtube_query)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto p-4 md:p-8"
    >
      <button 
        onClick={onReset}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-6 text-sm"
      >
        <ArrowLeft size={16} />
        もう一度書く
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Emotion & Analysis */}
        <div className="space-y-6">
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40">
            <h2 className="text-xl font-light text-gray-800 mb-4 text-center tracking-wide">感情分析</h2>
            <EmotionChart emotions={result.emotions} color={accentColor} />
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {result.hashtags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/60 rounded-full text-xs text-gray-600 shadow-sm border border-white/20">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">AIからのメッセージ</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              "{result.comment}"
            </p>
          </div>
        </div>

        {/* Right Column: Music & Mood */}
        <div className="space-y-6 flex flex-col justify-start">
            
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 text-center">
            <h2 className="text-xl font-light text-gray-800 mb-4 tracking-wide">今日の一曲</h2>
            
            {/* YouTube Embed Area */}
            <div className="mb-6 w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
               <iframe 
                 src={youtubeEmbedUrl}
                 width="100%" 
                 height="100%" 
                 title="YouTube Player"
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
            </div>

            <div className="text-left mb-6">
              <p className="text-xs text-gray-400 mb-1">RECOMMENDED QUERY</p>
              <p className="text-sm text-gray-700 font-bold">
                {result.youtube_query}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* YouTube Button */}
              <a 
                href={youtubeSearchUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <Youtube size={20} />
                  <span className="font-medium text-sm">YouTubeで聴く</span>
                </div>
                <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
              </a>

              {/* Spotify Button */}
              <a 
                href={spotifySearchUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-xl transition-colors shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.38 9.841-.719 13.44 1.5.42.3.6.84.301 1.321zm.12-3.36C15.54 8.82 9.059 8.58 5.28 9.721c-.6.181-1.26-.18-1.44-.72-.18-.6.18-1.26.72-1.44 4.44-1.32 11.58-1.02 15.6 1.38.6.36.78 1.14.42 1.74-.3.6-1.08.78-1.74.42z"/></svg>
                  <span className="font-medium text-sm">Spotifyで開く</span>
                </div>
                <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
              </a>

              {/* Apple Music Button */}
              <a 
                href={appleMusicUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-xl transition-all shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <Music size={20} />
                  <span className="font-medium text-sm">Apple Musicで探す</span>
                </div>
                <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
            
            {/* Fallback Spotify Embed */}
            {track && (
              <div className="mt-6 pt-6 border-t border-gray-200/50">
                 <p className="text-xs text-gray-400 mb-2 text-left">PREVIEW (SPOTIFY API)</p>
                 <SpotifyEmbed trackId={track.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultView;