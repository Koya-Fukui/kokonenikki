/**
 * Searches for a video on YouTube using the Data API v3.
 */
export const searchYoutubeVideo = async (query: string): Promise<string | null> => {
  // Using the provided API Key
  const apiKey = 'AIzaSyDf7W3uFFfFRhiERYeasL9X0YH9jccnaGg';
  
  if (!apiKey) {
    console.warn("YouTube API Key is missing. Falling back to search embed.");
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${apiKey}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API Error:", errorData);
      return null;
    }

    const data = await response.json();
    const videoId = data.items?.[0]?.id?.videoId;

    return videoId || null;
  } catch (error) {
    console.error("YouTube Search Failed:", error);
    return null;
  }
};