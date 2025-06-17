"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { changePassword, updateUser } from '@/utils/api';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();

  const [name, setName] = React.useState(user?.name || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const [address, setAddress] = React.useState(user?.adress || '');

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSave = async () => {
    if (!user) return;
    try {
      const updatedUser = await updateUser(Number(user.id), {
        name,
        email,
        adress: address,
      });
      
      // update store
      setUser(updatedUser);
      toast.success('Information updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update information');
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await changePassword(Number(user.id), currentPassword, newPassword);
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const details = err?.response?.data?.details?.toLowerCase();
      if (details && details.includes('current password is incorrect')) {
        toast.error('Current password is incorrect');
      } else {
        toast.error(err?.response?.data?.message || err?.response?.data?.details || 'Failed to update password');
      }
    }
  };

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="bg-card p-4 rounded-md shadow">
          <ul className="space-y-4">
            <li className="font-medium text-lg">Public profile</li>
            <li>Account settings</li>
            <li>Notifications</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2">
          <section className="p-6 bg-card rounded-md shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Public profile</h2>
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-muted-foreground flex items-center justify-center overflow-hidden">
                <img src={'/default-avatar.svg'} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 space-y-2">
                <Button variant="default">Change picture</Button>
                <Button variant="outline">Delete picture</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
                <Input
                  id="role"
                  placeholder="Role ID"
                  value={user?.roleId.toString() || ''}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="default" onClick={handleSave}>
                Save Information
              </Button>
            </div>
          </section>

          <section className="p-6 bg-card rounded-md shadow">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-muted-foreground mb-1">Current Password</label>
                <Input id="current-password" type="password" placeholder="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-muted-foreground mb-1">New Password</label>
                <Input id="new-password" type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground mb-1">Confirm New Password</label>
                <Input id="confirm-password" type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="default" onClick={handleChangePassword}>Update Password</Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}