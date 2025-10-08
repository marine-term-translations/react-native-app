import { Alert, Platform } from 'react-native';

/**
 * Show a cross-platform alert
 */
export const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  if (Platform.OS === 'web') {
    // For web, use window.alert
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message, buttons);
  }
};

/**
 * Show a confirmation dialog
 */
export const showConfirm = (title, message, onConfirm, onCancel) => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web') {
      const result = window.confirm(`${title}\n\n${message}`);
      if (result && onConfirm) onConfirm();
      if (!result && onCancel) onCancel();
      resolve(result);
    } else {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              if (onCancel) onCancel();
              resolve(false);
            },
          },
          {
            text: 'OK',
            onPress: () => {
              if (onConfirm) onConfirm();
              resolve(true);
            },
          },
        ],
        { cancelable: false }
      );
    }
  });
};

/**
 * Format error message for display
 */
export const formatError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data?.message || error.response.statusText || 'Server error';
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};
