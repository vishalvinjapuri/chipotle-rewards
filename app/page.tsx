'use client';

import { useState } from 'react';
import RewardCard from './components/RewardCard';
import FileUpload from './components/FileUpload';
import type { Promotion } from '../types/Promotion';

export default function Home() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileLoaded = (data: any[]) => {
    setIsLoading(true);
    setError(null);

    try {
      setPromotions(data.map((promo: Promotion) => ({
        ...promo,
        isUsed: false
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load promotions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsUsed = (code: string, used: boolean) => {
    setPromotions(promotions.map(promo => 
      promo.PromotionCode === code ? { ...promo, isUsed: used } : promo
    ));
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          My Rewards
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Manage your Chipotle rewards and offers
        </p>

        {promotions.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileLoaded={handleFileLoaded} />
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="text-center text-gray-600 dark:text-gray-400">
                Loading rewards...
              </div>
            )}

            {error && (
              <div className="text-center text-red-600 dark:text-red-400 mb-4">
                Error: {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotions.map(promotion => (
                <RewardCard
                  key={promotion.PromotionCode}
                  promotion={promotion}
                  onMarkAsUsed={handleMarkAsUsed}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
