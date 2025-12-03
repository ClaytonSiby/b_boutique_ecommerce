'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {api} from '@/lib/api';

// Get API URL - fallback to localhost if not set
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  return 'http://localhost:8000';
};

interface ImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

interface UploadedImage {
  url: string;
  variants: Record<string, string>;
  filename: string;
}

export default function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `File type not accepted. Accepted formats: ${acceptedFormats.join(', ')}`;
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB`;
    }
    return null;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);

    if (value.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      validFiles.push(file);
    }

    setUploading(true);

    try {
      const formData = new FormData();
      validFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await api.post<UploadedImage[]>(
        '/api/v1/uploads/upload-multiple',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Convert relative URLs to absolute URLs
      const newUrls = response.data.map((img) => {
        const apiUrl = getApiUrl();
        const url = img.url.startsWith('http') ? img.url : `${apiUrl}${img.url}`;
        console.log('Image URL:', url); // Debug log
        return url;
      });
      onChange([...value, ...newUrls]);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (urlToDelete: string) => {
    try {
      const filename = urlToDelete.split('/').pop();
      if (filename) {
        await api.delete(`/api/v1/uploads/delete/${filename}`);
      }
      onChange(value.filter((url) => url !== urlToDelete));
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to delete image');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-[#b88e72] bg-[#f7e6e1]'
            : 'border-gray-300 hover:border-[#b88e72] hover:bg-gray-50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleChange}
          className="hidden"
          disabled={uploading || value.length >= maxFiles}
          aria-label="Upload images"
        />
        {uploading ? (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="w-12 h-12 text-[#b88e72] animate-spin mb-4"
            />
            <p className="text-gray-600">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faUpload}
              className="w-12 h-12 text-gray-400 mb-4"
            />
            <p className="text-gray-700 font-medium mb-2">
              Drop images here or click to upload
            </p>
            <p className="text-sm text-gray-500">
              Max {maxFiles} images, up to {maxSize}MB each
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {acceptedFormats.map((f) => f.split('/')[1]).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={url} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src={url}
                  alt={`Upload ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  unoptimized
                  onError={(e) => {
                    console.error('Image failed to load:', url);
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/images/placeholder.jpg';
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleDelete(url)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center"
                aria-label="Delete image"
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
