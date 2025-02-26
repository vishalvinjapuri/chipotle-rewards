'use client';

import { useState, useRef, DragEvent } from 'react';

interface FileUploadProps {
  onFileLoaded: (data: any[]) => void;
}

export default function FileUpload({ onFileLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        throw new Error('Invalid file format. Expected an array of promotions.');
      }
      onFileLoaded(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={`
        border-4 border-dashed rounded-xl p-10 text-center
        transition-colors duration-200
        ${isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300'}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".json"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">
          Upload Your Promotions
        </h2>
        <p className="text-gray-500">
          Drag and drop your JSON file here, or click to select
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold
                   transition-all duration-200 hover:bg-red-700 active:scale-95"
        >
          Select File
        </button>
        {error && (
          <p className="text-red-600 mt-4">{error}</p>
        )}
      </div>
    </div>
  );
} 