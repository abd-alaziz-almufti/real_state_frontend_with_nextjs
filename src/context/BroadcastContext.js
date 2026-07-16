'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import windowPusher from 'pusher-js';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const BroadcastContext = createContext(null);

export const BroadcastProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [echoInstance, setEchoInstance] = useState(null);

  useEffect(() => {
    // Only connect if the user is authenticated and we're in the browser
    if (typeof window !== 'undefined' && isAuthenticated && user) {
      window.Pusher = windowPusher;

      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/';
      const authEndpoint = apiUrl.replace(/\/$/, '') + '/broadcasting/auth';

      const echo = new Echo({
        broadcaster: 'reverb',
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY || 'abcdefg',
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost',
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
        forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME || 'http') === 'https',
        enabledTransports: ['ws', 'wss'],
        authEndpoint: authEndpoint,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      });

      setEchoInstance(echo);

      // Listen to the default User channel (which Filament also uses)
      const channelName = `App.Models.User.${user.id}`;
      console.log(`[Broadcast] Subscribing to private channel: ${channelName}`);

      const channel = echo.private(channelName);

      channel.notification((notification) => {
        console.log('[Broadcast] Notification Received:', notification);

        // Show modern toast using sonner
        toast(notification.title || 'New Notification', {
          description: notification.message || notification.body || 'You have a new update.',
          action: notification.url ? {
            label: 'View',
            onClick: () => window.location.href = notification.url,
          } : undefined,
          duration: 5000,
        });
      });

      // Add connection state logging to debug connection issues
      echo.connector.pusher.connection.bind('connected', () => {
        console.log('[Broadcast] Successfully connected to Reverb WebSocket!');
      });
      echo.connector.pusher.connection.bind('disconnected', () => {
        console.log('[Broadcast] Disconnected from Reverb WebSocket.');
      });
      echo.connector.pusher.connection.bind('error', (err) => {
        console.error('[Broadcast] WebSocket Connection Error:', err);
      });

      return () => {
        if (echo) {
          console.log('[Broadcast] Cleaning up connection...');
          echo.leave(channelName);
          echo.disconnect();
        }
      };
    }
  }, [isAuthenticated, user]);

  return (
    <BroadcastContext.Provider value={{ echo: echoInstance }}>
      {children}
    </BroadcastContext.Provider>
  );
};

export const useBroadcast = () => {
  return useContext(BroadcastContext);
};
