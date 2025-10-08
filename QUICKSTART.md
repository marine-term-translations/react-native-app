# Quick Start Guide

This guide will help you get the Marine Term Translations mobile app running on your local machine in minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app on your phone (optional)

## Installation Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/marine-term-translations/react-native-app.git
cd react-native-app

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your settings
# For testing, you can use the default values
```

### 3. Start Development Server

```bash
npm start
```

This will open the Expo developer tools in your browser.

### 4. Run the App

Choose one of the following options:

#### Option A: iOS Simulator (Mac only)
```bash
# Press 'i' in the terminal
# or
npm run ios
```

#### Option B: Android Emulator
```bash
# Make sure Android Studio is running with an emulator
# Press 'a' in the terminal
# or
npm run android
```

#### Option C: Physical Device
1. Install "Expo Go" from App Store or Play Store
2. Scan the QR code shown in the terminal
3. App will load on your device

## First Time Setup

### GitHub OAuth (Required for Login)

To enable GitHub login, you need to create a GitHub OAuth App:

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Marine Term Translations Dev
   - **Homepage URL**: http://localhost:19000
   - **Authorization callback URL**: marine-term-translations://
4. Click "Register application"
5. Copy the Client ID
6. Update your `.env` file:
   ```
   EXPO_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
   ```

### Backend API

The app connects to the backend API for translation data:

```env
EXPO_PUBLIC_API_BASE_URL=https://docker-dev.vliz.be:5002
EXPO_PUBLIC_REPO=demo_with_gh_actions
```

If you're running your own backend, update these values accordingly.

## Testing the App

### 1. Login Flow
- Tap "Login with GitHub"
- Authorize the app (first time only)
- You should see the branches screen

### 2. Browse Branches
- View available translation branches
- See progress for each branch
- Tap a branch to start translating

### 3. Translate
- Edit translations for marine terms
- Save your changes
- View diff/changes

## Troubleshooting

### Metro bundler won't start
```bash
npx expo start -c
```

### Module not found errors
```bash
rm -rf node_modules
npm install
```

### iOS build errors
```bash
cd ios && pod install && cd ..
npx expo run:ios
```

### Android build errors
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

### OAuth redirect not working
1. Check that the redirect URI in GitHub OAuth app matches
2. Verify the scheme in `app.json`
3. Restart the development server

## Development Tips

### Hot Reload
- Save any file to see changes immediately
- Shake device to open developer menu
- Use React DevTools for debugging

### Clear Cache
```bash
npx expo start -c
```

### View Logs
- iOS: Check Xcode console
- Android: Check Android Studio Logcat
- Both: Check Metro bundler terminal

### Debug Network Requests
1. Open developer menu (shake device)
2. Enable "Debug Remote JS"
3. Open Chrome DevTools (http://localhost:19000/debugger-ui)
4. Go to Network tab

## Next Steps

- Read the [full README](README.md) for detailed information
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Join our GitHub Discussions for questions
- Report bugs via GitHub Issues

## Useful Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Clear cache and restart
npx expo start -c

# Install new package
npm install package-name

# Build for production
eas build --platform ios
eas build --platform android
```

## Getting Help

- **Documentation**: Check README.md
- **Issues**: https://github.com/marine-term-translations/react-native-app/issues
- **Discussions**: https://github.com/marine-term-translations/react-native-app/discussions
- **Expo Docs**: https://docs.expo.dev

Happy coding! 🚀
