import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useAuth } from '../contexts/AuthContext';
import { getCurrentUser } from '../services/apiService';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  };

  const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID;
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'marine-term-translations',
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: clientId,
      scopes: ['repo', 'user'],
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      handleAuthSuccess(response);
    } else if (response?.type === 'error') {
      Alert.alert('Authentication Error', 'Failed to authenticate with GitHub');
    }
  }, [response]);

  const handleAuthSuccess = async (authResponse) => {
    setLoading(true);
    try {
      const { code } = authResponse.params;
      
      // Exchange code for token via backend
      const backendUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
      const tokenResponse = await fetch(`${backendUrl}/api/github/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.access_token) {
        const token = `Bearer ${tokenData.access_token}`;
        
        // Get user info
        const userData = await getCurrentUser(token);
        
        // Save token and user data
        await login(token, userData);
        
        // Navigate to branches screen
        navigation.replace('Branches');
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Could not complete GitHub authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error starting auth:', error);
      Alert.alert('Error', 'Could not start authentication');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Marine Term Translations</Text>
        <Text style={styles.subtitle}>
          Collaborative translation platform for marine terminology
        </Text>

        <View style={styles.features}>
          <Text style={styles.featureText}>🌿 Branch-based workflow</Text>
          <Text style={styles.featureText}>🤖 AI translation suggestions</Text>
          <Text style={styles.featureText}>👥 Review and approval system</Text>
          <Text style={styles.featureText}>📊 Progress tracking</Text>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading || !request}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login with GitHub</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footer}>
          Built with ❤️ for the marine science community
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  features: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  loginButton: {
    backgroundColor: '#24292e',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#888',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default LoginScreen;
