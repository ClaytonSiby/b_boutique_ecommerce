'use client';

import { Suspense, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendar, faShieldAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

function ProfileContent() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      // Call API to update user
      const response = await fetch(`${API_BASE}/api/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);
      setIsEditing(false);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setSaveMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#3d2c29] mb-2">My Profile</h1>
          <p className="text-[#8b6d5a]">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Avatar Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#b88e72] to-[#8b6d5a] flex items-center justify-center shadow-lg">
                <span className="text-white text-5xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {saveMessage && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${
              saveMessage.includes('success')
                ? 'bg-green-50 border border-green-200 text-green-600'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {saveMessage}
            </div>
          )}

          {/* Edit Button */}
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <FontAwesomeIcon icon={faEdit} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#3d2c29] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                <FontAwesomeIcon icon={faUser} className="text-[#b88e72] mr-2" />
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  title="Username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                />
              ) : (
                <p className="text-[#3d2c29] px-4 py-3 bg-gray-50 rounded-lg">{user.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#b88e72] mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  title="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                />
              ) : (
                <p className="text-[#3d2c29] px-4 py-3 bg-gray-50 rounded-lg">{user.email}</p>
              )}
            </div>

            {/* Member Since */}
            <div>
              <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                <FontAwesomeIcon icon={faCalendar} className="text-[#b88e72] mr-2" />
                Member Since
              </label>
              <p className="text-[#3d2c29] px-4 py-3 bg-gray-50 rounded-lg">
                {formatDate(user.created_at)}
              </p>
            </div>

            {/* Account Status */}
            <div>
              <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                <FontAwesomeIcon icon={faShieldAlt} className="text-[#b88e72] mr-2" />
                Account Status
              </label>
              <div className="flex gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  user.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  user.is_verified
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {user.is_verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#3d2c29] mb-1">My Orders</h3>
              <p className="text-sm text-[#8b6d5a]">View order history</p>
            </div>
          </div>

          {/* Favorites */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#3d2c29] mb-1">Favorites</h3>
              <p className="text-sm text-[#8b6d5a]">Saved items</p>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#3d2c29] mb-1">Settings</h3>
              <p className="text-sm text-[#8b6d5a]">Account settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#3d2c29] text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <ProtectedRoute>
        <ProfileContent />
      </ProtectedRoute>
    </Suspense>
  );
}
