// Default colors for the idle state (Soft warm gradient)
export const DEFAULT_COLORS = ['#E0F2FE', '#F3E8FF', '#FCE7F3'];

// Mapping for radar chart
export const EMOTION_LABELS: Record<string, string> = {
  joy: '喜び',
  sad: '悲しみ',
  energy: '活力',
  calm: '穏やか',
  stress: 'ストレス',
};

// Fallback track if Spotify API fails or no token provided (A calming track)
export const FALLBACK_TRACK_ID = '4cOdK2wGLETKBW3PvgPWqT'; // "Never Gonna Give You Up" - just kidding, let's use a Lofi track
// Actual fallback: "Weightless" by Marconi Union or similar widely available
export const DEMO_TRACK_ID = '6lzc0Al0zfZOIFsFvBS1ki'; // "Weightless"
