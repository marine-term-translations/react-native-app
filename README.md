# Marine Term Translations - React Native Mobile App

A collaborative mobile application for translating marine terminology with GitHub integration, AI-powered suggestions, and comprehensive review workflows.

## 🌊 Overview

The Marine Term Translations Mobile App is a React Native port of the [React Front-End](https://github.com/marine-term-translations/React-Front-End) designed for iOS and Android devices. It enables researchers, translators, and marine science professionals to collaboratively translate marine terminology on the go.

### Key Features

- **🔐 GitHub OAuth Authentication** - Secure login with GitHub accounts
- **🌿 Branch-based Workflow** - Work on translations in isolated branches
- **📱 Native Mobile Experience** - Optimized for iOS and Android devices
- **🤖 AI Translation Suggestions** - Get intelligent translation recommendations
- **👥 Review and Approval System** - Collaborative review process
- **📊 Progress Tracking** - Visual charts showing translation completion
- **🔄 Conflict Resolution** - Handle merge conflicts with interactive tools
- **🌐 Semantic Data Support** - Process RDF/SKOS data
- **💾 Offline Support** - Secure token storage with Expo SecureStore

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Release Guide](#release-guide)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 8.x or higher
- **Git** for version control
- **Expo CLI** (installed automatically)
- **GitHub account** for authentication

### Platform-Specific Requirements

#### For iOS Development:
- **macOS** (required for iOS builds)
- **Xcode** 14.0 or higher
- **iOS Simulator** or physical iOS device
- **CocoaPods** (installed via Homebrew: `brew install cocoapods`)

#### For Android Development:
- **Android Studio** with Android SDK
- **Android Emulator** or physical Android device
- **Java Development Kit (JDK)** 17 or higher

## 🏁 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/marine-term-translations/react-native-app.git
cd react-native-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Backend API Configuration
EXPO_PUBLIC_API_BASE_URL=https://docker-dev.vliz.be:5002
EXPO_PUBLIC_REPO=demo_with_gh_actions

# GitHub OAuth Configuration
EXPO_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
EXPO_PUBLIC_REDIRECT_URI=marine-term-translations://
```

### 4. Start the Development Server

```bash
npm start
```

This will start the Expo development server. You can then:

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan the QR code with the Expo Go app on your physical device

## 📁 Project Structure

```
react-native-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   │   ├── LoginScreen.js      # GitHub OAuth login
│   │   ├── BranchesScreen.js   # Branch selection
│   │   ├── TranslateScreen.js  # Translation editor
│   │   └── ChangesScreen.js    # Diff viewer
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js     # Stack navigator
│   ├── contexts/           # React contexts
│   │   └── AuthContext.js      # Authentication state
│   ├── services/           # API services
│   │   └── apiService.js       # GitHub API integration
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
├── assets/                 # Images, fonts, icons
├── App.js                  # Main app component
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── .env                   # Environment variables (not committed)
```

## ⚙️ Configuration

### GitHub OAuth Setup

1. **Create a GitHub OAuth App**:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in the details:
     - Application name: `Marine Term Translations Mobile`
     - Homepage URL: `https://your-domain.com`
     - Authorization callback URL: `marine-term-translations://`
   - Note the Client ID

2. **Update Environment Variables**:
   ```env
   EXPO_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
   EXPO_PUBLIC_REDIRECT_URI=marine-term-translations://
   ```

### Backend API Configuration

The app connects to the same backend API as the React Front-End:

```env
EXPO_PUBLIC_API_BASE_URL=https://docker-dev.vliz.be:5002
EXPO_PUBLIC_REPO=demo_with_gh_actions
```

## 🛠️ Development Guide

### Step-by-Step Development Workflow

#### 1. Setting Up Your Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm start
```

#### 2. Running on iOS Simulator

```bash
# Start iOS simulator
npm run ios

# Or manually:
# 1. Open Xcode
# 2. Open Simulator
# 3. Press 'i' in the Expo terminal
```

#### 3. Running on Android Emulator

```bash
# Start Android emulator
npm run android

# Or manually:
# 1. Open Android Studio
# 2. Start AVD (Android Virtual Device)
# 3. Press 'a' in the Expo terminal
```

#### 4. Running on Physical Device

1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Run `npm start`
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

#### 5. Making Code Changes

The app supports hot reloading. Changes to your code will automatically reflect in the app.

- **Hot Reload**: `r` in terminal
- **Developer Menu**: Shake device or `Cmd+D` (iOS) / `Cmd+M` (Android)
- **Clear Cache**: `Shift+R` in terminal

### Development Tips

1. **Use React DevTools**:
   ```bash
   npm install -g react-devtools
   react-devtools
   ```

2. **Debug with Chrome**:
   - Open Developer Menu
   - Select "Debug Remote JS"
   - Open Chrome DevTools

3. **View Logs**:
   ```bash
   # iOS logs
   npx react-native log-ios
   
   # Android logs
   npx react-native log-android
   ```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Testing on Multiple Devices

Test on various screen sizes and OS versions:

- iPhone SE (small screen)
- iPhone 14 Pro (medium screen)
- iPad Pro (tablet)
- Android phones (various manufacturers)
- Android tablets

## 📦 Building for Production

### Using EAS Build (Recommended)

#### 1. Install EAS CLI

```bash
npm install -g eas-cli
```

#### 2. Login to Expo

```bash
eas login
```

#### 3. Configure EAS Build

```bash
eas build:configure
```

#### 4. Build for iOS

```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

#### 5. Build for Android

```bash
# Development build
eas build --platform android --profile development

# Production build (APK)
eas build --platform android --profile production

# Production build (AAB for Play Store)
eas build --platform android --profile production --release-channel production
```

### Local Build (Advanced)

#### iOS (macOS only)

```bash
# Generate iOS native project
npx expo prebuild --platform ios

# Install pods
cd ios && pod install && cd ..

# Build with Xcode
open ios/marinetermapp.xcworkspace
```

#### Android

```bash
# Generate Android native project
npx expo prebuild --platform android

# Build APK
cd android && ./gradlew assembleRelease

# Build AAB (for Play Store)
cd android && ./gradlew bundleRelease
```

## 🚀 Release Guide

### iOS App Store Release

#### 1. Prepare Your App

- Ensure all features are tested
- Update version in `app.json`
- Prepare screenshots (required sizes: 6.5", 5.5", iPad Pro)
- Write release notes

#### 2. Create App in App Store Connect

- Login to [App Store Connect](https://appstoreconnect.apple.com)
- Create new app
- Fill in app information
- Add screenshots and description

#### 3. Build and Submit

```bash
# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

#### 4. Review Process

- Apple typically reviews apps within 24-48 hours
- Address any feedback from Apple
- Once approved, release to App Store

### Android Play Store Release

#### 1. Prepare Your App

- Ensure all features are tested
- Update version in `app.json`
- Prepare screenshots (phone and tablet)
- Create feature graphic (1024x500)
- Write release notes

#### 2. Create App in Play Console

- Login to [Google Play Console](https://play.google.com/console)
- Create new app
- Fill in app information
- Set up pricing and distribution

#### 3. Generate Signing Key

```bash
# Generate upload key
keytool -genkeypair -v -storetype PKCS12 -keystore marine-term-upload-key.keystore -alias marine-term-key -keyalg RSA -keysize 2048 -validity 10000
```

#### 4. Build and Submit

```bash
# Build for Play Store
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

#### 5. Review Process

- Google reviews typically take a few hours to a few days
- Address any policy violations
- Once approved, release to production

### Version Management

Update version numbers in `app.json`:

```json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1"
    },
    "android": {
      "versionCode": 1
    }
  }
}
```

### Versioning Strategy

Follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

Example release workflow:

```bash
# Update version
# Edit app.json: "version": "1.1.0"

# Build and submit
eas build --platform all --profile production
eas submit --platform all

# Tag release in Git
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
```

## 🔌 API Integration

The app uses the same API as the React Front-End. All API calls are in `src/services/apiService.js`:

### Main API Endpoints

- `GET /api/github/branches` - Fetch all branches
- `GET /api/github/diff` - Get branch diff
- `PUT /api/github/update` - Update translations
- `GET /api/github/changed` - Get changed files
- `GET /api/github/user` - Get current user
- `GET /api/github/reviewers` - Get reviewers list
- `POST /api/github/pr/:prNumber/file/:filePath/approve` - Approve file

### Authentication

All API calls include the GitHub token in the Authorization header:

```javascript
headers: {
  Authorization: `Bearer ${token}`
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Metro Bundler Issues

```bash
# Clear cache
npx expo start -c

# Reset metro bundler
rm -rf node_modules
npm install
npx expo start -c
```

#### 2. iOS Simulator Not Starting

```bash
# Reset simulator
xcrun simctl erase all

# Reinstall app
npx expo run:ios --device
```

#### 3. Android Build Errors

```bash
# Clean gradle
cd android
./gradlew clean
cd ..

# Rebuild
npx expo run:android
```

#### 4. OAuth Redirect Issues

Ensure your redirect URI matches exactly:
- In GitHub OAuth App settings
- In `.env` file
- In `app.json` under `scheme`

#### 5. API Connection Issues

- Check backend URL is correct
- Verify SSL certificates
- Test API endpoints with Postman
- Check network connectivity

### Getting Help

- Check [Expo Documentation](https://docs.expo.dev)
- Visit [React Navigation Docs](https://reactnavigation.org)
- Search [GitHub Issues](https://github.com/marine-term-translations/react-native-app/issues)
- Ask in [GitHub Discussions](https://github.com/marine-term-translations/react-native-app/discussions)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Quick Contributing Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **[React Front-End](https://github.com/marine-term-translations/React-Front-End)** - Web application
- **Backend API** - Server-side component
- **Translation Memory** - Shared translation resources

