import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cocone Diary | 心音日記',
  description: 'An AI-powered emotional diary that analyzes your mood and prescribes the perfect Spotify track.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=Shippori+Mincho:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}