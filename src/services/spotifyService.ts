import { SpotifyTrack } from "../types";

/**
 * Searches for a track on Spotify.
 * Requires a valid Access Token. 
 */
export const searchSpotifyTrack = async (query: string, token: string): Promise<SpotifyTrack | null> => {
  if (!token) {
    console.warn("No Spotify token provided. Using fallback.");
    return null;
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
         throw new Error("Spotify Token Expired or Invalid");
      }
      throw new Error(`Spotify API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const item = data.tracks.items[0];

    if (!item) return null;

    return {
      id: item.id,
      name: item.name,
      artist: item.artists.map((a: any) => a.name).join(", "),
      albumArt: item.album.images[0]?.url || "",
      uri: item.uri,
    };
  } catch (error) {
    console.error("Spotify Search Failed:", error);
    return null;
  }
};