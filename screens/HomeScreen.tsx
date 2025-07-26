import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

interface FileItem {
  id: string;
  name: string;
  size: number;
  created_at: string;
  public_url?: string;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.storage
        .from('user-files')
        .list(user.id, {
          limit: 100,
          offset: 0,
        });

      if (error) throw error;

      const filesWithUrls = await Promise.all(
        (data || []).map(async (file) => {
          const { data: urlData } = supabase.storage
            .from('user-files')
            .getPublicUrl(`${user.id}/${file.name}`);

          return {
            id: file.id || file.name,
            name: file.name,
            size: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString(),
            public_url: urlData.publicUrl,
          };
        })
      );

      setFiles(filesWithUrls);
    } catch (error: any) {
      console.error('Error loading files:', error.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFiles();
    setRefreshing(false);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      uploadFile(result.assets[0].uri, result.assets[0].fileName || 'image.jpg');
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets[0]) {
      uploadFile(result.assets[0].uri, result.assets[0].name);
    }
  };

  const uploadFile = async (uri: string, fileName: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      const { error } = await supabase.storage
        .from('user-files')
        .upload(`${user.id}/${fileName}`, arrayBuffer, {
          contentType: blob.type,
          upsert: true,
        });

      if (error) throw error;

      Alert.alert('Success', 'File uploaded successfully');
      loadFiles();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileName: string) => {
    if (!user) return;

    Alert.alert(
      'Delete File',
      'Are you sure you want to delete this file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase.storage
                .from('user-files')
                .remove([`${user.id}/${fileName}`]);

              if (error) throw error;
              loadFiles();
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 60,
    },
    greeting: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    actionButtons: {
      flexDirection: 'row',
      padding: 20,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    actionButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    fileItem: {
      backgroundColor: colors.surface,
      marginHorizontal: 20,
      marginBottom: 12,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    fileInfo: {
      flex: 1,
      marginLeft: 12,
    },
    fileName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    fileDetails: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    deleteButton: {
      padding: 8,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyStateText: {
      fontSize: 18,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
        </Text>
        <Text style={styles.subtitle}>
          Welcome to your personal storage space
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={pickImage}
          disabled={loading}
        >
          <Ionicons name="image" size={20} color="white" />
          <Text style={styles.actionButtonText}>Add Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={pickDocument}
          disabled={loading}
        >
          <Ionicons name="document" size={20} color="white" />
          <Text style={styles.actionButtonText}>Add File</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Files</Text>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {files.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>
              No files yet. Upload your first photo or document to get started!
            </Text>
          </View>
        ) : (
          files.map((file) => (
            <View key={file.id} style={styles.fileItem}>
              <Ionicons
                name={file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? 'image' : 'document'}
                size={24}
                color={colors.primary}
              />
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{file.name}</Text>
                <Text style={styles.fileDetails}>
                  {formatFileSize(file.size)} • {new Date(file.created_at).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteFile(file.name)}
              >
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
