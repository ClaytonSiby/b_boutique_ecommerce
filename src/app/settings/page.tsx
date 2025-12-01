'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faUser,
  faLock,
  faBell,
  faShieldAlt,
  faEye,
  faEyeSlash,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

function SettingsContent() {
  const { user, token, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'password' | 'notifications' | 'privacy'>(
    'account'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Account Settings
  const [accountData, setAccountData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  // Password Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productUpdates: false,
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showPurchaseHistory: false,
    dataCollection: true,
  });

  const handleAccountUpdate = async () => {
    if (!user || !token) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(accountData),
      });

      if (!response.ok) {
        throw new Error('Failed to update account');
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);
      setSaveMessage('Account updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch {
      setSaveMessage('Failed to update account. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!user || !token) return;

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveMessage('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setSaveMessage('Password must be at least 8 characters!');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSaveMessage('Password updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch {
      setSaveMessage('Failed to update password. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationUpdate = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call
    setTimeout(() => {
      setSaveMessage('Notification preferences updated!');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 500);
  };

  const handlePrivacyUpdate = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call
    setTimeout(() => {
      setSaveMessage('Privacy settings updated!');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 500);
  };

  const tabs = [
    { id: 'account' as const, label: 'Account', icon: faUser },
    { id: 'password' as const, label: 'Password', icon: faLock },
    { id: 'notifications' as const, label: 'Notifications', icon: faBell },
    { id: 'privacy' as const, label: 'Privacy', icon: faShieldAlt },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <FontAwesomeIcon icon={faCog} className="text-4xl text-[#b88e72]" />
          </div>
          <h1 className="text-4xl font-bold text-[#3d2c29] mb-2">Settings</h1>
          <p className="text-[#8b6d5a]">Manage your account preferences</p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm ${
              saveMessage.includes('success') || saveMessage.includes('updated')
                ? 'bg-green-50 border border-green-200 text-green-600'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}
          >
            {saveMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#b88e72] border-b-2 border-[#b88e72]'
                      : 'text-[#8b6d5a] hover:text-[#b88e72]'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#3d2c29] mb-6">Account Information</h2>

                <div>
                  <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={accountData.username}
                    onChange={(e) =>
                      setAccountData({ ...accountData, username: e.target.value })
                    }
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(e) =>
                      setAccountData({ ...accountData, email: e.target.value })
                    }
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <button
                  onClick={handleAccountUpdate}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            )}

            {/* Password Settings */}
            {activeTab === 'password' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#3d2c29] mb-6">Change Password</h2>

                <div>
                  <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      placeholder="Enter your current password"
                      title="Current Password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      title={showPasswords.current ? "Hide current password" : "Show current password"}
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6d5a]"
                    >
                      <FontAwesomeIcon icon={showPasswords.current ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      placeholder="Enter your new password"
                      title="New Password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      title={showPasswords.new ? "Hide new password" : "Show new password"}
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6d5a]"
                    >
                      <FontAwesomeIcon icon={showPasswords.new ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      placeholder="Confirm your new password"
                      title="Confirm New Password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      title={showPasswords.confirm ? "Hide confirm password" : "Show confirm password"}
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6d5a]"
                    >
                      <FontAwesomeIcon icon={showPasswords.confirm ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePasswordUpdate}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span>{isSaving ? 'Updating...' : 'Update Password'}</span>
                </button>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#3d2c29] mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-[#3d2c29]">
                          {key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                        </p>
                        <p className="text-sm text-[#8b6d5a]">
                          Receive notifications about{' '}
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                      </div>
                      <label htmlFor="showPurchaseHistory" className="relative inline-flex items-center cursor-pointer">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() =>
                              setNotifications({ ...notifications, [key]: !value })
                            }
                            className="sr-only peer"
                            title={`Toggle ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications`}
                            placeholder={`Toggle ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications`}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b88e72]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b88e72]"></div>
                        </label>
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b88e72]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b88e72]"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNotificationUpdate}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span>{isSaving ? 'Saving...' : 'Save Preferences'}</span>
                </button>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#3d2c29] mb-6">Privacy Settings</h2>

                <div className="space-y-4">
                  <div className="py-3 border-b border-gray-100">
                    <label className="block font-medium text-[#3d2c29] mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) =>
                        setPrivacy({ ...privacy, profileVisibility: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all"
                      title="Profile Visibility"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-[#3d2c29]">Show Purchase History</p>
                      <p className="text-sm text-[#8b6d5a]">
                        Allow others to see your purchase history
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <label htmlFor="showPurchaseHistory" className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy.showPurchaseHistory}
                          onChange={() =>
                            setPrivacy({
                              ...privacy,
                              showPurchaseHistory: !privacy.showPurchaseHistory,
                            })
                          }
                          className="sr-only peer"
                          title="Show Purchase History"
                          placeholder="Show Purchase History"
                          id="showPurchaseHistory"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b88e72]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b88e72]"></div>
                      </label>
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b88e72]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b88e72]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-[#3d2c29]">Data Collection</p>
                      <p className="text-sm text-[#8b6d5a]">
                        Help us improve by sharing usage data
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <label htmlFor="dataCollection" className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="dataCollection"
                          type="checkbox"
                          checked={privacy.dataCollection}
                          onChange={() =>
                            setPrivacy({ ...privacy, dataCollection: !privacy.dataCollection })
                          }
                          className="sr-only peer"
                          title="Data Collection"
                          placeholder="Enable Data Collection"
                        />
                      </label>
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b88e72]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b88e72]"></div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handlePrivacyUpdate}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
