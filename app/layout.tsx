'use client';

import { useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check localStorage and system preference for dark mode
    const savedTheme = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
