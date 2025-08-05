#!/bin/bash

# Change to project directory (script should run from project root)
cd "$(dirname "$0")/.."

echo "🚀 Starting E2E environment setup..."

# Start emulator in background
echo "📱 Starting Android emulator..."
$ANDROID_HOME/emulator/emulator -avd Medium_Phone_API_36.0 -no-audio -no-window &
EMULATOR_PID=$!

# Wait for emulator to boot
echo "⏳ Waiting for emulator to boot (30s)..."
sleep 30

# Check if emulator is connected
echo "🔍 Checking emulator connection..."
adb wait-for-device
echo "✅ Emulator connected!"

# Build and install native Android app
echo "🔨 Building and installing app..."
expo run:android

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ E2E environment ready!"
    echo "📱 Emulator PID: $EMULATOR_PID"
    echo "🧪 make sure all good by running: npm run e2e:test:can-test"
else
    echo "❌ Failed to install app"
    exit 1
fi