import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "School Management System",
  description: "Manage students, teachers, and academic records efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100`}
      >
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>

      </body>
    </html>
  );
}
