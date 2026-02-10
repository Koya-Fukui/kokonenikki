/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Exposing keys to the client-side bundle as the app logic relies on them
    API_KEY: process.env.API_KEY,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
};

module.exports = nextConfig;