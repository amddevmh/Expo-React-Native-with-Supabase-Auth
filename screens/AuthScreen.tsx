import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert('Success', 'Check your email for verification link');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    console.log('🚀 Starting Google OAuth...');
    setLoading(true);
    try {
      // Use WebBrowser with custom scheme redirect for real APK
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.EXPO_PUBLIC_APP_SCHEME}://auth/callback`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        console.log('🌐 Opening OAuth URL:', data.url);
        
        // Open the OAuth URL and wait for completion
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          `${process.env.EXPO_PUBLIC_APP_SCHEME}://auth/callback`
        );
        
        console.log('📱 WebBrowser result:', JSON.stringify(result, null, 2));
        
        // Parse tokens from the result URL if available
        if (result.type === 'success' && result.url) {
          const url = result.url;
          console.log('🔗 Full result URL:', url);
          
          // Extract tokens from URL hash or query params
          let accessToken, refreshToken;
          
          if (url.includes('#')) {
            const hashParams = new URLSearchParams(url.split('#')[1]);
            accessToken = hashParams.get('access_token');
            refreshToken = hashParams.get('refresh_token');
          }
          
          if (accessToken && refreshToken) {
            console.log('🔑 Found tokens in URL, setting session...');
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (sessionError) {
              console.error('❌ Session error:', sessionError);
            } else {
              console.log('✅ Session set successfully!');
              return; // Exit early, no need to check session again
            }
          }
        }
        
        // Give Supabase a moment to process the callback
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if user session was set
        const { data: { session } } = await supabase.auth.getSession();
        console.log('🔐 Session check:', session ? 'Session found!' : 'No session');
        
        if (session) {
          console.log('✅ OAuth successful, user logged in!', session.user.email);
        } else {
          console.log('🔄 No session found, trying to refresh...');
          const refreshResult = await supabase.auth.refreshSession();
          console.log('🔄 Refresh result:', refreshResult);
        }
      }
    } catch (error: any) {
      console.error('❌ Google Auth Error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
      console.log('🏁 Google OAuth process finished');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 40,
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    googleButton: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    googleButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    switchText: {
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
    switchButton: {
      color: colors.primary,
      fontWeight: '600',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      color: colors.textSecondary,
      paddingHorizontal: 16,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </Text>
        <Text style={styles.subtitle}>
          {isSignUp 
            ? 'Sign up to get started with your account' 
            : 'Sign in to your account'
          }
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleEmailAuth}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleAuth}
          disabled={loading}
        >
          <Ionicons name="logo-google" size={20} color={colors.text} />
          <Text style={styles.googleButtonText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <Text
            style={styles.switchButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
