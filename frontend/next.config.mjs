/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.API_URL || "https://task-1-final-nine.vercel.app"
    }
};

export default nextConfig;
