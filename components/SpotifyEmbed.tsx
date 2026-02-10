import React from 'react';

interface SpotifyEmbedProps {
  trackId: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ trackId }) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-xl bg-black">
      <iframe
        style={{ borderRadius: '12px' }}
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      />
    </div>
  );
};

export default SpotifyEmbed;