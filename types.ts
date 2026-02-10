export interface EmotionData {
  joy: number;
  sad: number;
  energy: number;
  calm: number;
  stress: number;
}

export type MusicCategory = 'J-Pop' | 'Western';

export interface AnalysisResult {
  emotions: EmotionData;
  colors: string[];
  spotify_query: string;
  youtube_query: string;
  comment: string;
  hashtags: string[];
}

export interface DiaryLog {
  id: string;
  created_at: string;
  content: string;
  emotions: EmotionData;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  uri: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}