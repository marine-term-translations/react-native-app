import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { fetchDiffChanged } from '../services/apiService';

const ChangesScreen = ({ route, navigation }) => {
  const { branch } = route.params;
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    loadChanges();
  }, []);

  const loadChanges = async () => {
    try {
      setLoading(true);
      const response = await fetchDiffChanged();
      setChanges(response.data || []);
    } catch (error) {
      console.error('Error loading changes:', error);
      Alert.alert('Error', 'Failed to load changes');
    } finally {
      setLoading(false);
    }
  };

  const renderDiffLine = (line, index) => {
    let lineStyle = styles.normalLine;
    let textStyle = styles.normalText;

    if (line.startsWith('+')) {
      lineStyle = styles.addedLine;
      textStyle = styles.addedText;
    } else if (line.startsWith('-')) {
      lineStyle = styles.removedLine;
      textStyle = styles.removedText;
    } else if (line.startsWith('@@')) {
      lineStyle = styles.metaLine;
      textStyle = styles.metaText;
    }

    return (
      <View key={index} style={lineStyle}>
        <Text style={textStyle}>{line}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
        <Text style={styles.loadingText}>Loading changes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Changes</Text>
        <Text style={styles.branchName}>Branch: {branch}</Text>
      </View>

      <ScrollView style={styles.content}>
        {changes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No changes to display</Text>
          </View>
        ) : (
          changes.map((file, fileIndex) => (
            <View key={fileIndex} style={styles.fileSection}>
              <View style={styles.fileHeader}>
                <Text style={styles.fileName}>{file.filename}</Text>
                {file.status && (
                  <Text
                    style={[
                      styles.fileStatus,
                      file.status === 'modified' && styles.statusModified,
                      file.status === 'added' && styles.statusAdded,
                      file.status === 'removed' && styles.statusRemoved,
                    ]}
                  >
                    {file.status}
                  </Text>
                )}
              </View>

              {file.patch && (
                <View style={styles.diffContainer}>
                  {file.patch.split('\n').map((line, lineIndex) =>
                    renderDiffLine(line, lineIndex)
                  )}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
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
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  fileSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  fileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24292e',
    flex: 1,
  },
  fileStatus: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusModified: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  statusAdded: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusRemoved: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  diffContainer: {
    padding: 10,
  },
  normalLine: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  normalText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#24292e',
  },
  addedLine: {
    backgroundColor: '#e6ffed',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  addedText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#22863a',
  },
  removedLine: {
    backgroundColor: '#ffeef0',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  removedText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#cb2431',
  },
  metaLine: {
    backgroundColor: '#f1f8ff',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  metaText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#005cc5',
  },
});

export default ChangesScreen;
