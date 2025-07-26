# React Native Supabase Template 🚀

A complete React Native template with Supabase authentication, storage, and modern UI features. This template provides everything you need to quickly start building a production-ready mobile app with user authentication, file storage, and a beautiful interface.

## ✨ Features

- 🔐 **Authentication**: Email/password and Google OAuth login
- 🏠 **Home Screen**: File upload and management interface
- 👤 **Profile Screen**: User profile management and settings
- 🧭 **Navigation**: Bottom tab navigation with React Navigation
- 🌓 **Theme System**: Dark/Light/System mode switching
- 📱 **Cross-Platform**: Ready for iOS and Android deployment
- 💾 **File Storage**: Supabase Storage integration for photos and documents
- 🎨 **Modern UI**: Clean, responsive design with proper theming

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment example file and add your credentials:

```bash
cp .env.example .env
```

Update `.env` with your actual Supabase and Google OAuth credentials:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google OAuth Configuration
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id

# App Configuration
EXPO_PUBLIC_APP_SCHEME=com.yourcompany.yourapp
```

### 3. Supabase Setup

Create a storage bucket in your Supabase project:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `user-files`
3. Set the bucket to **Public** or configure RLS policies
4. Enable Google OAuth in Authentication → Providers

### 4. Start Development

```bash
npx expo start
```

Choose your preferred development environment:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app

## 📱 Deployment

### Android

```bash
npx expo run:android
```

### iOS

```bash
npx expo run:ios
```

### Production Build

```bash
npx expo build:android
npx expo build:ios
```

## 🔧 Configuration

### Bundle Identifier

Update the bundle identifier in `app.json`:

```json
{
  "expo": {
    "scheme": "com.yourcompany.yourapp",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

### Google OAuth Setup

1. **Google Cloud Console**:
   - Create Android OAuth Client ID with your package name and SHA-1 fingerprint
   - Create Web OAuth Client ID for Supabase integration

2. **Supabase Dashboard**:
   - Enable Google provider in Authentication → Providers
   - Add your Web Client ID and Secret
   - Set redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

## 📁 Project Structure

```
├── app/                    # Expo app directory
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Authentication state
│   └── ThemeContext.tsx   # Theme management
├── lib/                   # Utilities
│   └── supabase.ts       # Supabase client
├── navigation/            # Navigation setup
│   └── AppNavigator.tsx  # Main navigator
├── screens/              # App screens
│   ├── AuthScreen.tsx    # Login/signup
│   ├── HomeScreen.tsx    # File management
│   └── ProfileScreen.tsx # User profile
└── .env.example          # Environment template
```

## 🎨 Customization

### Themes

Customize colors in `contexts/ThemeContext.tsx`:

```typescript
const lightColors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  // ... other colors
};
```

### Navigation

Add new screens in `navigation/AppNavigator.tsx` and create corresponding screen components.

## 🔐 Security Notes

- Never commit `.env` file to version control
- Use Row Level Security (RLS) policies in Supabase
- Keep service role keys secure and server-side only
- Validate file uploads and set size limits

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding!** 🎉
