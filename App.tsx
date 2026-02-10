import React, { useState } from 'react';
import MeshBackground from './components/MeshBackground';
import DiaryInput from './components/DiaryInput';
import ResultView from './components/ResultView';
import HistoryModal from './components/HistoryModal'; 
import { analyzeDiaryEntry } from './services/geminiService';
import { searchSpotifyTrack } from './services/spotifyService';
import { searchYoutubeVideo } from './services/youtubeService';
import { AppState, AnalysisResult, SpotifyTrack, MusicCategory } from './types';
import { DEFAULT_COLORS, DEMO_TRACK_ID } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [diaryText, setDiaryText] = useState('');
  const [category, setCategory] = useState<MusicCategory>('J-Pop'); 
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [bgColors, setBgColors] = useState<string[]>(DEFAULT_COLORS);
  
  const [spotifyToken] = useState<string>(() => {
    return localStorage.getItem('spotify_token') || '';
  });

  const handleAnalyze = async () => {
    if (!diaryText.trim()) return;

    setState(AppState.ANALYZING);
    try {
      // 1. Analyze with Gemini
      const analysis = await analyzeDiaryEntry(diaryText, category);
      setResult(analysis);
      setBgColors(analysis.colors);

      // Parallel execution for external APIs to speed up UX
      const [foundTrack, foundVideoId] = await Promise.all([
        // 2. Search Spotify (if token exists)
        spotifyToken ? searchSpotifyTrack(analysis.spotify_query, spotifyToken) : Promise.resolve(null),
        // 3. Search YouTube (using API Key)
        searchYoutubeVideo(analysis.youtube_query)
      ]);

      setTrack(foundTrack);
      setYoutubeVideoId(foundVideoId);

      setState(AppState.RESULT);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("分析中にエラーが発生しました。もう一度お試しください。");
      setState(AppState.IDLE);
      setBgColors(DEFAULT_COLORS);
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setDiaryText('');
    setResult(null);
    setTrack(null);
    setYoutubeVideoId(null);
    setBgColors(DEFAULT_COLORS);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <MeshBackground colors={bgColors} />
      
      <HistoryModal />

      <div className="w-full z-10 flex justify-center">
        {state === AppState.IDLE || state === AppState.ANALYZING ? (
          <DiaryInput 
            value={diaryText} 
            onChange={setDiaryText} 
            onSubmit={handleAnalyze}
            isAnalyzing={state === AppState.ANALYZING}
            category={category}
            onCategoryChange={setCategory}
          />
        ) : (
          result && (
            <ResultView 
              result={result} 
              track={track}
              youtubeVideoId={youtubeVideoId}
              onReset={handleReset}
              fallbackTrackId={DEMO_TRACK_ID}
            />
          )
        )}
      </div>

      <footer className="absolute bottom-4 text-center w-full text-xs text-gray-400 font-light tracking-widest z-0 pointer-events-none">
        COCONE DIARY © 2025
      </footer>
    </div>
  );
};

export default App;