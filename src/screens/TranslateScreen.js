import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { fetchBranchDiff, sendUpdateFile } from '../services/apiService';

const TranslateScreen = ({ route, navigation }) => {
  const { branch } = route.params;
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [diffData, setDiffData] = useState(null);
  const [translations, setTranslations] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      const data = await fetchBranchDiff(token, branch);
      setDiffData(data);
      
      // Initialize translations state
      const initialTranslations = {};
      if (data.files) {
        data.files.forEach(file => {
          if (file.translations) {
            initialTranslations[file.filename] = file.translations;
          }
        });
      }
      setTranslations(initialTranslations);
    } catch (error) {
      console.error('Error loading translations:', error);
      Alert.alert('Error', 'Failed to load translations');
    } finally {
      setLoading(false);
    }
  };

  const handleTranslationChange = (filename, key, value) => {
    setTranslations(prev => ({
      ...prev,
      [filename]: {
        ...prev[filename],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Save each file
      for (const [filename, fileTranslations] of Object.entries(translations)) {
        await sendUpdateFile(filename, fileTranslations);
      }
      
      Alert.alert('Success', 'Translations saved successfully');
    } catch (error) {
      console.error('Error saving translations:', error);
      Alert.alert('Error', 'Failed to save translations');
    } finally {
      setSaving(false);
    }
  };

  const handleViewChanges = () => {
    navigation.navigate('Changes', { branch });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
        <Text style={styles.loadingText}>Loading translations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Translate</Text>
          <Text style={styles.branchName}>Branch: {branch}</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.changesButton}
            onPress={handleViewChanges}
          >
            <Text style={styles.changesButtonText}>View Changes</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {diffData?.files?.map((file, fileIndex) => (
          <View key={fileIndex} style={styles.fileSection}>
            <Text style={styles.fileName}>{file.filename}</Text>
            
            {file.translations && Object.entries(file.translations).map(([key, value], index) => (
              <View key={index} style={styles.translationItem}>
                <Text style={styles.translationKey}>{key}</Text>
                <TextInput
                  style={styles.translationInput}
                  value={translations[file.filename]?.[key] || value}
                  onChangeText={(text) =>
                    handleTranslationChange(file.filename, key, text)
                  }
                  multiline
                  placeholder="Enter translation..."
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save All</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24292e',
  },
  branchName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  changesButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  changesButtonText: {
    color: '#0366d6',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  fileSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24292e',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  translationItem: {
    marginBottom: 15,
  },
  translationKey: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  translationInput: {
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    minHeight: 40,
    color: '#24292e',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#94d3a2',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TranslateScreen;
