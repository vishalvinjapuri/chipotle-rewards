'use client';

import { useState } from 'react';
import type { Promotion } from '../types/Promotion';

interface RewardCardProps {
  promotion: Promotion;
  onMarkAsUsed: (code: string, used: boolean) => void;
}

export default function RewardCard({ promotion, onMarkAsUsed }: RewardCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const expirationDate = new Date(promotion.ExpirationDate).toLocaleDateString();
  const isExpired = new Date(promotion.ExpirationDate) < new Date();

  // Only set src if WebImage exists and is not empty
  const imageSrc = promotion.WebImage || '/placeholder-image.png';

  const handleToggleUsed = () => {
    if (!promotion.isUsed) {
      onMarkAsUsed(promotion.PromotionCode, true);
    } else {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmUnmark = () => {
    onMarkAsUsed(promotion.PromotionCode, false);
    setShowConfirmDialog(false);
  };

  return (
    <>
      <div className={`
        relative rounded-xl shadow-lg overflow-hidden 
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
        ${promotion.isUsed ? 'opacity-60' : ''}
        bg-white dark:bg-gray-800 flex flex-col h-full
      `}>
        <div className="relative">
          <img 
            src={imageSrc}
            alt={promotion.PromotionName}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.png';
            }}
          />
          {promotion.isUsed && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-3xl font-bold tracking-wider">USED</span>
            </div>
          )}
          {isExpired && !promotion.isUsed && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Expired
            </div>
          )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              {promotion.PromotionName}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              {promotion.PromotionDescription}
            </p>
            
            {showDetails && (
              <div className="mt-6 space-y-3 animate-fadeIn">
                <p className="text-red-600 dark:text-red-400 font-semibold">
                  Expires: {expirationDate}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {promotion.TermsAndConditions}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => setShowCode(!showCode)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold
                       transition-all duration-200 hover:bg-red-700 active:scale-95"
            >
              {showCode ? promotion.PromotionCode : 'Show Code'}
            </button>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-semibold
                       transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>

            <button
              onClick={handleToggleUsed}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95
                ${promotion.isUsed 
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
            >
              {promotion.isUsed ? 'Mark as Unused' : 'Mark as Used'}
            </button>
          </div>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirm Action
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to mark this promotion as unused?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmUnmark}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Yes, Confirm
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}