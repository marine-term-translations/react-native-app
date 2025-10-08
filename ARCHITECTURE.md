# Architecture Overview

This document describes the architecture of the Marine Term Translations Mobile App.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture Patterns](#architecture-patterns)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Navigation](#navigation)
- [API Integration](#api-integration)
- [Security](#security)
- [Performance](#performance)

## Technology Stack

### Core Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and toolkit
- **React Navigation**: Navigation library
- **Axios**: HTTP client for API calls

### Key Libraries

- **expo-auth-session**: OAuth authentication
- **expo-secure-store**: Secure credential storage
- **expo-web-browser**: Web browser for OAuth flow
- **react-native-gesture-handler**: Touch gesture handling
- **react-native-screens**: Native screen optimization

## Project Structure

```
react-native-app/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ErrorBoundary.js
│   │   └── LoadingScreen.js
│   ├── screens/           # Screen components (pages)
│   │   ├── LoginScreen.js
│   │   ├── BranchesScreen.js
│   │   ├── TranslateScreen.js
│   │   └── ChangesScreen.js
│   ├── navigation/        # Navigation configuration
│   │   └── AppNavigator.js
│   ├── contexts/          # React contexts
│   │   └── AuthContext.js
│   ├── services/          # API and external services
│   │   └── apiService.js
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
│       ├── constants.js
│       ├── helpers.js
│       └── validation.js
├── assets/                # Images, fonts, icons
├── .github/              # GitHub templates and workflows
├── App.js                # Root component
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## Architecture Patterns

### Component Architecture

The app follows a **component-based architecture**:

1. **Screens**: Top-level route components
2. **Components**: Reusable UI elements
3. **Containers**: Components with business logic
4. **Presentational**: Pure UI components

### Code Organization

```
Screen Component
├── State (useState, useEffect)
├── Business Logic (handlers, computations)
├── Render (JSX)
└── Styles (StyleSheet)
```

## Data Flow

### Authentication Flow

```
User Action → Login Screen
           ↓
GitHub OAuth → Web Browser
           ↓
Token Exchange → Backend API
           ↓
Store Token → SecureStore
           ↓
Update Context → AuthContext
           ↓
Navigate → Branches Screen
```

### Translation Edit Flow

```
User Edit → Local State (useState)
         ↓
Auto-save → API Service
         ↓
Backend → GitHub Repository
         ↓
Response → Update UI
```

### Data Fetching Flow

```
Screen Mount → useEffect
            ↓
API Call → apiService.js
         ↓
Axios → Backend API
      ↓
Response → Update State
         ↓
Re-render → Display Data
```

## State Management

### Local State

Uses React hooks for component-level state:

```javascript
const [branches, setBranches] = useState([]);
const [loading, setLoading] = useState(true);
```

### Global State

Uses React Context for app-level state:

```javascript
<AuthContext.Provider value={{ user, token, login, logout }}>
  {children}
</AuthContext.Provider>
```

### Persistent State

Uses Expo SecureStore for sensitive data:

```javascript
await SecureStore.setItemAsync('github_token', token);
const token = await SecureStore.getItemAsync('github_token');
```

## Navigation

### Navigation Structure

```
Stack Navigator
├── Login Screen (unauthenticated)
└── Authenticated Stack
    ├── Branches Screen
    ├── Translate Screen
    └── Changes Screen
```

### Navigation Flow

```javascript
// Navigate with params
navigation.navigate('Translate', { branch: 'main' });

// Go back
navigation.goBack();

// Replace screen
navigation.replace('Login');
```

## API Integration

### Service Layer

All API calls are centralized in `apiService.js`:

```javascript
export const fetchBranches = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/api/github/branches`, {
    params: { repo: REPO },
    headers: { Authorization: token },
  });
  return response.data;
};
```

### Request Flow

```
Component → Service Function
         ↓
Axios → HTTP Request
      ↓
Backend API → Process
            ↓
Response → Return to Component
         ↓
Update State → Re-render
```

### Error Handling

```javascript
try {
  const data = await fetchBranches(token);
  setBranches(data);
} catch (error) {
  console.error('Error:', error);
  Alert.alert('Error', 'Failed to load branches');
}
```

## Security

### Token Storage

- **SecureStore**: Encrypted storage for tokens
- **Never in code**: Tokens never hardcoded
- **Automatic cleanup**: Tokens cleared on logout

### API Security

- **HTTPS only**: All API calls use HTTPS
- **Token in headers**: Bearer token authentication
- **No token in URLs**: Tokens never in query params

### Environment Variables

- **Expo Public Prefix**: `EXPO_PUBLIC_` for client-side
- **Not committed**: `.env` in `.gitignore`
- **Example file**: `.env.example` for reference

## Performance

### Optimization Strategies

1. **FlatList**: For efficient list rendering
2. **Memoization**: Prevent unnecessary re-renders
3. **Lazy loading**: Load data on demand
4. **Image optimization**: Compress and cache images
5. **Network requests**: Minimize API calls

### Memory Management

- Clean up effects with return functions
- Remove event listeners on unmount
- Clear timers and intervals
- Optimize images and assets

### Bundle Size

- Use Expo's managed workflow
- Tree-shake unused code
- Optimize dependencies
- Code splitting where possible

## Error Handling

### Error Boundary

Catches rendering errors:

```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### API Error Handling

Standardized error handling:

```javascript
const formatError = (error) => {
  if (error.response) {
    return error.response.data?.message || 'Server error';
  } else if (error.request) {
    return 'Network error';
  } else {
    return error.message || 'Unexpected error';
  }
};
```

### User Feedback

- Loading states for async operations
- Error messages via Alert
- Success confirmations
- Empty state handling

## Design Patterns

### Container/Presentation Pattern

- **Container**: Handles logic and state
- **Presentation**: Renders UI

### Custom Hooks Pattern

Encapsulate reusable logic:

```javascript
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Service Pattern

Centralize external interactions:

```javascript
// apiService.js
export const fetchData = async () => { /* ... */ };
export const updateData = async () => { /* ... */ };
```

## Testing Strategy

### Unit Tests

- Test utility functions
- Test custom hooks
- Test service functions

### Integration Tests

- Test component interactions
- Test navigation flow
- Test API integration

### E2E Tests

- Test complete user flows
- Test on real devices
- Test edge cases

## Deployment

### Build Process

1. **Development**: `npm start`
2. **Preview**: `eas build --profile preview`
3. **Production**: `eas build --profile production`

### Release Channels

- **Development**: Internal testing
- **Preview**: Beta testing
- **Production**: App stores

## Future Improvements

### Planned Features

- Offline mode with local caching
- Push notifications for updates
- Dark mode support
- Internationalization (i18n)
- Advanced search and filtering
- Real-time collaboration

### Technical Improvements

- TypeScript migration
- Redux for complex state
- Improved testing coverage
- Performance monitoring
- Analytics integration
- Crash reporting

## Best Practices

### Code Style

- Use functional components
- Prefer hooks over classes
- Keep components small and focused
- Write self-documenting code
- Add comments for complex logic

### File Organization

- Group related files together
- Use index.js for exports
- Keep files under 300 lines
- Separate business logic from UI

### Performance

- Avoid inline functions in render
- Use React.memo for expensive components
- Optimize images and assets
- Minimize re-renders
- Profile before optimizing

### Security

- Never commit secrets
- Validate all inputs
- Sanitize user data
- Use HTTPS for all requests
- Keep dependencies updated

## Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [React Hooks Guide](https://react.dev/reference/react)
