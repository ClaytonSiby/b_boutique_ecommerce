/**
 * Utility functions for handling image URLs
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Converts a backend image path to a full URL
 * Handles various image path formats from the backend
 */
export function getImageUrl(imagePath: string | null | undefined): string {
    // Return placeholder if no image
    if (!imagePath) {
        return '/assets/images/placeholder.svg';
    }

    // If it's already a full URL, return as-is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Remove leading slashes
    const cleanPath = imagePath.replace(/^\/+/, '');

    // If it's a local asset, return as-is
    if (cleanPath.startsWith('assets/')) {
        return `/${cleanPath}`;
    }

    // For backend uploads (both local and GCS proxy)
    // Paths like: "uploads/..." or "api/v1/uploads/gcs/..."
    return `${API_URL}/${cleanPath}`;
}

/**
 * Gets the first image URL from an array of images
 */
export function getFirstImageUrl(images: string[] | null | undefined): string {
    if (!images || images.length === 0) {
        return getImageUrl(null);
    }
    return getImageUrl(images[0]);
}
