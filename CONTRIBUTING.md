# Contributing to Marine Term Translations Mobile App

Thank you for your interest in contributing to the Marine Term Translations Mobile App! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

- **Bug Reports**: Report bugs via GitHub Issues
- **Feature Requests**: Suggest new features
- **Code Contributions**: Submit pull requests
- **Documentation**: Improve documentation
- **Testing**: Test on different devices and OS versions
- **Translations**: Help translate the app interface

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy of the repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/react-native-app.git
cd react-native-app
```

### 3. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/` for new features
- `bugfix/` for bug fixes
- `docs/` for documentation
- `refactor/` for code refactoring

## 💻 Development Guidelines

### Code Style

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons** at the end of statements
- Follow **React Native best practices**
- Use **functional components** and hooks
- Write **meaningful variable names**

### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyComponent = ({ prop1, prop2 }) => {
  // State hooks
  const [state, setState] = useState(null);

  // Effect hooks
  useEffect(() => {
    // Side effects
  }, []);

  // Event handlers
  const handleEvent = () => {
    // Handle event
  };

  // Render
  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyComponent;
```

### File Naming

- Components: `PascalCase.js` (e.g., `LoginScreen.js`)
- Services: `camelCase.js` (e.g., `apiService.js`)
- Constants: `UPPER_CASE.js` (e.g., `COLORS.js`)

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```bash
git commit -m "feat(auth): add GitHub OAuth login"
git commit -m "fix(translation): resolve save button issue"
git commit -m "docs(readme): update installation instructions"
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test LoginScreen.test.js

# Run with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for all new features
- Maintain test coverage above 80%
- Test edge cases and error handling

Example test:

```javascript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

describe('LoginScreen', () => {
  it('renders login button', () => {
    const { getByText } = render(<LoginScreen />);
    expect(getByText('Login with GitHub')).toBeTruthy();
  });

  it('handles login button press', async () => {
    const { getByText } = render(<LoginScreen />);
    const button = getByText('Login with GitHub');
    
    fireEvent.press(button);
    
    await waitFor(() => {
      // Assert expected behavior
    });
  });
});
```

## 📝 Pull Request Process

### 1. Ensure Quality

- All tests pass: `npm test`
- Code follows style guidelines
- No linting errors
- Documentation is updated
- App runs on both iOS and Android

### 2. Update Documentation

- Update README.md if needed
- Add inline code comments
- Update API documentation

### 3. Submit Pull Request

1. Push your changes to your fork
2. Go to the original repository
3. Click "New Pull Request"
4. Select your branch
5. Fill in the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Added/updated tests
- [ ] All tests passing

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added to complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### 4. Code Review

- Respond to reviewer feedback
- Make requested changes
- Update your branch if needed

### 5. Merge

Once approved, your PR will be merged by a maintainer.

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - Device: iPhone 14 Pro, Samsung Galaxy S21, etc.
   - OS Version: iOS 16.0, Android 12, etc.
   - App Version: 1.0.0
6. **Screenshots**: If applicable
7. **Logs**: Any relevant error logs

Example:

```markdown
**Description**
Login button doesn't respond on Android

**Steps to Reproduce**
1. Open app on Android device
2. Tap "Login with GitHub" button
3. Nothing happens

**Expected Behavior**
Should open GitHub OAuth page

**Actual Behavior**
Button press has no effect

**Environment**
- Device: Samsung Galaxy S21
- OS: Android 12
- App Version: 1.0.0

**Screenshots**
[Attach screenshot]

**Logs**
[Paste relevant logs]
```

## 💡 Feature Requests

When requesting features, please include:

1. **Use Case**: Why is this feature needed?
2. **Description**: Detailed feature description
3. **Mockups**: UI mockups if applicable
4. **Alternatives**: Other solutions considered

## 📋 Development Workflow

### Daily Development

```bash
# 1. Start development
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes
# ... edit files ...

# 4. Test changes
npm test
npm start # Test on device/simulator

# 5. Commit changes
git add .
git commit -m "feat: add my feature"

# 6. Push to fork
git push origin feature/my-feature

# 7. Create PR on GitHub
```

### Keeping Your Fork Updated

```bash
# Add upstream remote (once)
git remote add upstream https://github.com/marine-term-translations/react-native-app.git

# Update your fork
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

## 🔍 Code Review Guidelines

As a reviewer:

- Be constructive and respectful
- Explain reasoning for suggestions
- Approve when ready or request changes
- Test the changes if possible

As a contributor:

- Be open to feedback
- Ask questions if unclear
- Respond to all comments
- Update code based on feedback

## 📚 Resources

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Git Workflow](https://guides.github.com/introduction/flow/)

## 📞 Getting Help

- **Issues**: [GitHub Issues](https://github.com/marine-term-translations/react-native-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/marine-term-translations/react-native-app/discussions)
- **Email**: Contact maintainers

## 📜 Code of Conduct

Please note we have a code of conduct. Please follow it in all interactions with the project.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

Examples of unacceptable behavior:

- Use of sexualized language or imagery
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Special thanks in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Marine Term Translations! 🌊
