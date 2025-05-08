"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';

export default function SettingsPage() {
  const { user } = useAuthStore();

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
                <img src={user?.imageUrl || '/default-avatar.svg'} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 space-y-2">
                <Button variant="default">Change picture</Button>
                <Button variant="outline">Delete picture</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                <Input id="name" placeholder="Name" defaultValue={user?.name || ''} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <Input id="email" placeholder="Email" defaultValue={user?.email || ''} />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
                <Input id="role" placeholder="Role" defaultValue={user?.role || ''} />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
                <Input id="address" placeholder="Address" defaultValue={user?.adress || ''} />
              </div>
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-muted-foreground mb-1">Class</label>
                <Input id="class" placeholder="Class" defaultValue={user?.class || ''} />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="default">Save Information</Button>
            </div>
          </section>

          <section className="p-6 bg-card rounded-md shadow">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-muted-foreground mb-1">Current Password</label>
                <Input id="current-password" type="password" placeholder="Current Password" />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-muted-foreground mb-1">New Password</label>
                <Input id="new-password" type="password" placeholder="New Password" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground mb-1">Confirm New Password</label>
                <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="default">Update Password</Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}