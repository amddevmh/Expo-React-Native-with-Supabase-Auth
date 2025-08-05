# E2E Testing - Quick Guide

## 🚀 First Time Setup

**1. Install dependencies:**
```bash
npm install
```

**2. Update app ID (use your `app.json` android.package):**
- `.maestro/app-launch-test.yaml` → Change `appId:` to match your package name
- Line 72 below → Update package name in clear data command

**3. Install Maestro:**
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

**4. Requirements:**
- Android SDK installed
- Android emulator available
- `.env` file configured

## Quick Commands

```bash
npm run e2e:full           # Complete test (start → test → status)
npm run e2e:env:start      # Start emulator + app
npm run e2e:test:can-test  # Run app launch test
npm run e2e:test:all       # Run all tests
npm run e2e:env:stop       # Stop emulator
```

## Workflow

**Option 1**: One command

```bash
npm run e2e:full
```

**Option 2**: Step by step

```bash
npm run e2e:env:start      # Once
npm run e2e:test:can-test  # Test app launch
npm run e2e:test:all       # Or run all tests
npm run e2e:env:stop       # When done
```

## What It Tests

✅ App launches successfully  
✅ Ready for Phase 2 (notifications)

## Metro + E2E Development

**Best**: Separate terminals

```bash
# Terminal 1
npm start

# Terminal 2
npm run e2e:test:all(req, started test env)
```

**Stop background Metro**:

```bash
fg 1         # Bring to front, then Ctrl+C
kill 12345   # Or kill by PID
```

## Troubleshooting

```bash
npm run e2e:env:status  # Check status
npm run e2e:env:stop    # Force stop
npm run e2e:full        # Start fresh
```

## Clear app data (nuclear option)

```bash
adb shell pm clear com.amddev.ReactNativeSupabaseTemplate
```
