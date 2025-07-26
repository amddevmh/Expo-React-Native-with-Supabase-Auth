import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import AppNavigator from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  useEffect(() => {
    // Handle deep link for OAuth callback
    const handleDeepLink = async (url: string) => {
      console.log('🔗 Deep link received:', url);
      console.log('🔍 URL contains auth/callback:', url.includes('auth/callback'));
      console.log('🔍 URL contains access_token:', url.includes('access_token'));
      
      if (url.includes('auth/callback') && url.includes('access_token')) {
        try {
          // Extract tokens from URL hash
          const hashPart = url.split('#')[1];
          if (hashPart) {
            const params = new URLSearchParams(hashPart);
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');
            
            console.log('🔑 Extracted tokens:');
            console.log('  - Access token:', accessToken ? 'Found' : 'Missing');
            console.log('  - Refresh token:', refreshToken ? 'Found' : 'Missing');
            
            if (accessToken && refreshToken) {
              console.log('🔑 Setting session from deep link...');
              const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
              
              if (error) {
                console.error('❌ Deep link session error:', error);
              } else {
                console.log('✅ Deep link OAuth successful!');
              }
            }
          }
        } catch (error) {
          console.error('❌ Deep link processing error:', error);
        }
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    // Handle initial URL if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => subscription?.remove();
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
