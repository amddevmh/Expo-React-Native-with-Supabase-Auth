import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { createThemedStyles, spacing, borderRadius, typography, shadows, getCardStyle } from '../constants/Styles';

import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  const { colors } = useTheme();
  const { signOut, user } = useAuth();
  const themedStyles = createThemedStyles(colors);
  
  const getInitials = (name: string, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.charAt(0).toUpperCase();
  };

  return (
    <DrawerContentScrollView 
      {...props} 
      style={[styles.drawerContent, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Modern Header Section with Gradient */}
      <LinearGradient
        colors={colors.gradientPrimary}
        style={styles.drawerHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>
              {getInitials(
                user?.user_metadata?.full_name || '',
                user?.email || ''
              )}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Modern Navigation Items */}
      <View style={styles.drawerItems}>
        <TouchableOpacity
          style={[
            styles.drawerMenuItem,
            props.state.routeNames[props.state.index] === 'Home' && styles.drawerMenuItemActive
          ]}
          onPress={() => props.navigation.navigate('Home')}
        >
          <View style={styles.menuItemIcon}>
            <Ionicons
              name={props.state.routeNames[props.state.index] === 'Home' ? 'home' : 'home-outline'}
              size={24}
              color={props.state.routeNames[props.state.index] === 'Home' ? colors.primary : colors.textSecondary}
            />
          </View>
          <Text style={[
            styles.menuItemText,
            { 
              color: props.state.routeNames[props.state.index] === 'Home' ? colors.primary : colors.text,
              fontWeight: props.state.routeNames[props.state.index] === 'Home' ? typography.weights.semibold : typography.weights.medium
            }
          ]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.drawerMenuItem,
            props.state.routeNames[props.state.index] === 'Profile' && styles.drawerMenuItemActive
          ]}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <View style={styles.menuItemIcon}>
            <Ionicons
              name={props.state.routeNames[props.state.index] === 'Profile' ? 'person' : 'person-outline'}
              size={24}
              color={props.state.routeNames[props.state.index] === 'Profile' ? colors.primary : colors.textSecondary}
            />
          </View>
          <Text style={[
            styles.menuItemText,
            { 
              color: props.state.routeNames[props.state.index] === 'Profile' ? colors.primary : colors.text,
              fontWeight: props.state.routeNames[props.state.index] === 'Profile' ? typography.weights.semibold : typography.weights.medium
            }
          ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modern Footer Section */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={signOut}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={[styles.signOutText, { color: colors.error }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  const { colors, theme } = useTheme();

  return (
    <>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: typography.weights.bold,
            fontSize: typography.sizes.lg,
          },
          drawerStyle: {
            backgroundColor: colors.background,
            width: 300,
          },
          drawerType: 'slide',
          overlayColor: colors.backdrop,
          sceneContainerStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={24} color={tintColor} />
            </TouchableOpacity>
          ),
          headerTitle: 'Home',
        })}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={24} color={tintColor} />
            </TouchableOpacity>
          ),
          headerTitle: 'Profile',
        })}
      />
      </Drawer.Navigator>
    </>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const { colors, theme } = useTheme();

  if (loading) {
    return null; // You could add a loading screen here
  }

  return user ? <MainDrawer /> : <AuthStack />;
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.huge + spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: spacing.lg,
  },
  avatarText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.extrabold,
    color: 'white',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: 'white',
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: typography.weights.medium,
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  drawerMenuItemActive: {
    backgroundColor: `rgba(99, 102, 241, 0.1)`,
  },
  menuItemIcon: {
    width: 32,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuItemText: {
    fontSize: typography.sizes.base,
  },
  drawerFooter: {
    padding: spacing.xl,
    marginTop: 'auto',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  signOutText: {
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.base,
  },
  menuButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
