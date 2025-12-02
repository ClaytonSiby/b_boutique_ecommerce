'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get('token');
    
    if (token) {
      // Store the token with the correct key that AuthContext expects
      localStorage.setItem('auth_token', token);
      
      // Force a page reload to trigger AuthContext to fetch user data
      window.location.href = '/';
    } else {
      // If no token, redirect to login
      router.push('/login?error=authentication_failed');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b88e72] mx-auto mb-4"></div>
        <p className="text-[#3d2c29] text-lg">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b88e72]"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
