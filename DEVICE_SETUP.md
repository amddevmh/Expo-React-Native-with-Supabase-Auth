# 📱 Device Setup Guide

## 🚀 Quick Start Commands

### **Physical Android Device**
```bash
# 1. Connect phone via USB + enable USB debugging
# 2. Check device is connected
adb devices

# 3. Install APK
adb -s RFCY10BAS3L install ~/Desktop/ReactNativeSupabaseTemplate-Sidebar.apk

# 4. Open app on your phone
```

### **Android Emulator (From Scratch)**
```bash
# 1. Start emulator (choose ONE method):

# METHOD A: From Android Studio (Recommended)
# - Open Android Studio
# - Tools → AVD Manager
# - Click ▶️ next to "Medium_Phone_API_36.0"
# - Wait for emulator to boot (2-3 minutes)

# METHOD B: From Command Line
emulator -avd Medium_Phone_API_36.0
# (Keep this terminal open, emulator runs in background)

# 2. Wait for emulator to fully boot (you'll see Android home screen)

# 3. In NEW terminal, check emulator is ready:
adb devices
# Should show: emulator-5554   device

# 4. Install APK:
adb -s emulator-5554 install ~/Desktop/ReactNativeSupabaseTemplate-Sidebar.apk

# 5. Open app in emulator (look for app icon)
```

## 🔧 Troubleshooting

### **Emulator Won't Start**
```bash
# Check available emulators:
emulator -list-avds

# If no emulators, create one in Android Studio:
# Tools → AVD Manager → Create Virtual Device
```

### **Emulator is Offline**
```bash
# Restart ADB
adb kill-server && adb start-server

# Check devices again
adb devices

# If still offline, restart emulator from Android Studio
```

### **App Won't Install**
```bash
# Uninstall old version first:
adb -s emulator-5554 uninstall com.template.reactnativesupabase

# Then install new version:
adb -s emulator-5554 install ~/Desktop/ReactNativeSupabaseTemplate-Sidebar.apk
```

## 📦 Build New APK (if needed)
```bash
# Build and install in one command
npx expo run:android --variant release

# Or just build
npx expo run:android --variant release --no-install
```

## 🎯 App Locations
- **APK File:** `~/Desktop/ReactNativeSupabaseTemplate-Sidebar.apk`
- **Source APK:** `android/app/build/outputs/apk/release/app-release.apk`

## ✅ Features Working
- ✅ Google OAuth
- ✅ Collapsible Sidebar Navigation  
- ✅ File Storage
- ✅ Dark/Light Themes
