'use client';
import { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus('success');
        setMessage('🎉 Welcome! Check your email for a confirmation message.');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || 'Failed to subscribe');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('An error occurred. Please try again later.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isSubmitting}
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent shadow-lg placeholder:text-gray-400 transition-all duration-300 hover:bg-white text-sm sm:text-base disabled:opacity-50" 
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-2xl shadow-2xl hover:shadow-[#b88e72]/50 transition-all duration-300 hover:scale-105 font-semibold hover:from-[#8b6d5a] hover:to-[#b88e72] whitespace-nowrap text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
            {!isSubmitting && <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>}
          </button>
        </div>
        
        {message && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            status === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
        
        <p className="text-xs text-[#3d2c29]/60 mt-3 text-center sm:text-left">
          🔒 We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
