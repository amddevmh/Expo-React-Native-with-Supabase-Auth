import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { createThemedStyles, spacing, borderRadius, typography, shadows, getCardStyle } from '../constants/Styles';

const { width } = Dimensions.get('window');

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const themedStyles = createThemedStyles(colors);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  useEffect(() => {
    // Animate in sequence for a polished entrance
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  const handleQuickActionPress = (actionTitle: string) => {
    // Add haptic feedback and scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    
    console.log(`${actionTitle} pressed`);
  };

  const features: FeatureCard[] = [
    {
      id: '1',
      title: 'Analytics',
      description: 'View your app analytics and insights',
      icon: 'analytics',
      color: colors.info,
      onPress: () => console.log('Analytics pressed'),
    },
    {
      id: '2',
      title: 'Settings',
      description: 'Customize your app preferences',
      icon: 'settings',
      color: colors.accent,
      onPress: () => console.log('Settings pressed'),
    },
    {
      id: '3',
      title: 'Notifications',
      description: 'Manage your notification settings',
      icon: 'notifications',
      color: colors.warning,
      onPress: () => console.log('Notifications pressed'),
    },
    {
      id: '4',
      title: 'Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      color: colors.success,
      onPress: () => console.log('Support pressed'),
    },
  ];

  const quickActions = [
    { id: '1', title: 'Create', icon: 'add-circle', color: colors.primary },
    { id: '2', title: 'Share', icon: 'share', color: colors.secondary },
    { id: '3', title: 'Favorite', icon: 'heart', color: colors.error },
    { id: '4', title: 'Search', icon: 'search', color: colors.info },
  ];

  const styles = StyleSheet.create({
    gradientHeader: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xxxl,
      borderBottomLeftRadius: borderRadius.xxl,
      borderBottomRightRadius: borderRadius.xxl,
    },
    headerContent: {
      paddingTop: spacing.huge,
    },
    greeting: {
      fontSize: typography.sizes.huge,
      fontWeight: typography.weights.extrabold,
      color: colors.textInverse,
      marginBottom: spacing.sm,
      letterSpacing: 0.5,
    },
    subtitle: {
      fontSize: typography.sizes.lg,
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: typography.weights.medium,
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.xl,
      marginTop: -spacing.xl,
      marginBottom: spacing.xxl,
      gap: spacing.md,
    },
    statCard: {
      ...getCardStyle(colors, 'medium'),
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: typography.sizes.xxxl,
      fontWeight: typography.weights.extrabold,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    statLabel: {
      fontSize: typography.sizes.sm,
      color: colors.textSecondary,
      fontWeight: typography.weights.semibold,
    },
    quickActionsContainer: {
      paddingHorizontal: spacing.xl,
      marginBottom: spacing.xxxl,
    },
    sectionTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.extrabold,
      color: colors.text,
      marginBottom: spacing.lg,
      letterSpacing: 0.3,
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    quickActionButton: {
      ...getCardStyle(colors, 'low'),
      flex: 1,
      alignItems: 'center',
    },
    quickActionIcon: {
      marginBottom: spacing.sm,
    },
    quickActionText: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
      color: colors.text,
    },
    featuresContainer: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xl,
    },
    featureCard: {
      ...getCardStyle(colors, 'high'),
      marginBottom: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
    },
    featureIconContainer: {
      width: 60,
      height: 60,
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.xl,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    featureDescription: {
      fontSize: typography.sizes.base,
      color: colors.textSecondary,
      lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    },
    chevron: {
      opacity: 0.6,
    },
  });

  return (
    <SafeAreaView style={themedStyles.container} edges={['bottom']}>
      <LinearGradient
        colors={colors.gradientPrimary}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>
            Hello, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
          </Text>
          <Text style={styles.subtitle}>
            Welcome to your modern workspace
          </Text>
        </View>
      </LinearGradient>

      <Animated.View 
        style={[
          styles.statsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <Animated.View style={[styles.statCard, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </Animated.View>
        <Animated.View style={[styles.statCard, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </Animated.View>
        <Animated.View style={[styles.statCard, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </Animated.View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.quickActionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={action.id}
                style={{
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                  ],
                }}
              >
                <TouchableOpacity
                  style={styles.quickActionButton}
                  onPress={() => handleQuickActionPress(action.title)}
                  activeOpacity={0.7}
                >
                  <View style={styles.quickActionIcon}>
                    <Ionicons
                      name={action.icon as any}
                      size={28}
                      color={action.color}
                    />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Features</Text>
          {features.map((feature, index) => (
            <Animated.View
              key={feature.id}
              style={{
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim }
                ],
              }}
            >
              <TouchableOpacity
                style={styles.featureCard}
                onPress={feature.onPress}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.featureIconContainer,
                    { backgroundColor: `${feature.color}15` },
                  ]}
                >
                  <Ionicons
                    name={feature.icon as any}
                    size={28}
                    color={feature.color}
                  />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textTertiary}
                  style={styles.chevron}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
