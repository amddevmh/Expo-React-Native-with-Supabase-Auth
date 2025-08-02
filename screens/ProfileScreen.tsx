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
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { createThemedStyles, spacing, borderRadius, typography, shadows, getCardStyle, getButtonStyle } from '../constants/Styles';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { colors, theme, themeMode, setThemeMode } = useTheme();
  const themedStyles = createThemedStyles(colors);
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
    gradientHeader: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xxxl,
      borderBottomLeftRadius: borderRadius.xxl,
      borderBottomRightRadius: borderRadius.xxl,
      alignItems: 'center',
    },
    headerContent: {
      paddingTop: spacing.huge,
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: spacing.lg,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 4,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    avatarText: {
      fontSize: typography.sizes.massive,
      fontWeight: typography.weights.extrabold,
      color: colors.textInverse,
    },
    displayName: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.extrabold,
      color: colors.textInverse,
      marginBottom: spacing.xs,
      textAlign: 'center',
    },
    email: {
      fontSize: typography.sizes.base,
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: typography.weights.medium,
      textAlign: 'center',
    },
    content: {
      marginTop: -spacing.xl,
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xl,
    },
    section: {
      ...getCardStyle(colors, 'medium'),
      marginBottom: spacing.lg,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      color: colors.text,
      padding: spacing.xl,
      paddingBottom: spacing.md,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuItemIcon: {
      marginRight: spacing.lg,
    },
    menuItemText: {
      flex: 1,
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.medium,
      color: colors.text,
    },
    menuItemValue: {
      fontSize: typography.sizes.base,
      color: colors.textSecondary,
      marginRight: spacing.sm,
    },
    input: {
      ...themedStyles.input,
      marginHorizontal: spacing.xl,
      marginBottom: spacing.lg,
    },
    editButtons: {
      flexDirection: 'row',
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.lg,
      gap: spacing.md,
    },
    editButton: {
      ...getButtonStyle(colors, 'primary'),
      flex: 1,
    },
    cancelButton: {
      ...getButtonStyle(colors, 'secondary'),
      flex: 1,
    },
    buttonText: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.semibold,
      color: colors.textInverse,
    },
    cancelButtonText: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.semibold,
      color: colors.text,
    },
    themeOptions: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xl,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      marginBottom: spacing.sm,
    },
    themeOptionActive: {
      backgroundColor: `${colors.primary}15`,
    },
    themeOptionText: {
      flex: 1,
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.medium,
      color: colors.text,
      marginLeft: spacing.md,
    },
    signOutButton: {
      backgroundColor: colors.error,
      marginHorizontal: spacing.xl,
      marginBottom: spacing.xl,
      borderRadius: borderRadius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      ...shadows.medium,
      shadowColor: colors.shadowColor,
    },
    signOutButtonText: {
      color: colors.textInverse,
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.semibold,
    },
  });

  const getInitials = (name: string, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.charAt(0).toUpperCase();
  };

  return (
    <SafeAreaView style={themedStyles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={colors.gradientPrimary}
          style={styles.gradientHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {getInitials(
                    user?.user_metadata?.full_name || '',
                    user?.email || ''
                  )}
                </Text>
              </View>
            </View>
            <Text style={styles.displayName}>
              {user?.user_metadata?.full_name || 'User'}
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>

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
                  style={styles.cancelButton}
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
                  <Text style={styles.buttonText}>
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
              <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <View style={styles.themeOptions}>
              {(['light', 'dark', 'system'] as const).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.themeOption,
                    themeMode === mode && styles.themeOptionActive,
                  ]}
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
                    color={colors.textTertiary}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
