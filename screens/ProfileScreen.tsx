import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { colors, theme, themeMode, setThemeMode } = useTheme();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(
    user?.user_metadata?.full_name || ''
  );
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: displayName }
      });

      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully');
      setEditing(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const getThemeIcon = (mode: string) => {
    switch (mode) {
      case 'light':
        return 'sunny';
      case 'dark':
        return 'moon';
      case 'system':
        return 'phone-portrait';
      default:
        return 'sunny';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 60,
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
    displayName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    section: {
      backgroundColor: colors.surface,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 12,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuItemIcon: {
      marginRight: 16,
    },
    menuItemText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    menuItemValue: {
      fontSize: 16,
      color: colors.textSecondary,
      marginRight: 8,
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    editButtons: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingBottom: 16,
      gap: 12,
    },
    editButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    editButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    themeOptions: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    themeOptionText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
    signOutButton: {
      backgroundColor: colors.error,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    signOutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const getInitials = (name: string, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.charAt(0).toUpperCase();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(
              user?.user_metadata?.full_name || '',
              user?.email || ''
            )}
          </Text>
        </View>
        <Text style={styles.displayName}>
          {user?.user_metadata?.full_name || 'User'}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        {editing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              placeholderTextColor={colors.textSecondary}
              value={displayName}
              onChangeText={setDisplayName}
            />
            <View style={styles.editButtons}>
              <TouchableOpacity
                style={[styles.editButton, styles.cancelButton]}
                onPress={() => {
                  setEditing(false);
                  setDisplayName(user?.user_metadata?.full_name || '');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleUpdateProfile}
                disabled={loading}
              >
                <Text style={styles.editButtonText}>
                  {loading ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemLast]}
            onPress={() => setEditing(true)}
          >
            <Ionicons name="person" size={24} color={colors.primary} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Display Name</Text>
            <Text style={styles.menuItemValue}>
              {user?.user_metadata?.full_name || 'Not set'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.themeOptions}>
          {(['light', 'dark', 'system'] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              style={styles.themeOption}
              onPress={() => setThemeMode(mode)}
            >
              <Ionicons
                name={themeMode === mode ? 'radio-button-on' : 'radio-button-off'}
                size={24}
                color={colors.primary}
              />
              <Text style={styles.themeOptionText}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
              </Text>
              <Ionicons
                name={getThemeIcon(mode)}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuItem}>
          <Ionicons name="mail" size={24} color={colors.primary} style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Email</Text>
          <Text style={styles.menuItemValue}>{user?.email}</Text>
        </View>
        <View style={[styles.menuItem, styles.menuItemLast]}>
          <Ionicons name="time" size={24} color={colors.primary} style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Member Since</Text>
          <Text style={styles.menuItemValue}>
            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
