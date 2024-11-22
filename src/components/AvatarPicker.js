import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '@utils/helpers';

const AvatarPicker = ({
  visible,
  onClose,
  onReset,
  onImageSelect,
  onTakePhoto,
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPressOut={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Select an Avatar</Text>
            <TouchableOpacity onPress={onReset}>
              <Text style={styles.resetText}>Default</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onImageSelect}>
              <Ionicons
                name="image-outline"
                size={40}
                color={theme.colors.text}
              />
              <Text style={styles.actionText}>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={onTakePhoto}>
              <Ionicons
                name="camera-outline"
                size={40}
                color={theme.colors.text}
              />
              <Text style={styles.actionText}>Take a Photo</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      width: '100%',
      alignItems: 'center',
      maxHeight: SCREEN_HEIGHT * 0.5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.text,
    },
    resetText: {
      color: theme.colors.primary,
      fontSize: 16,
      marginBottom: 20,
    },
    avatarContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
    },
    avatarOption: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      margin: 5,
      width: SCREEN_WIDTH / 3 - 30,
      height: SCREEN_WIDTH / 3 - 30,
      borderRadius: 10,
    },
    avatarImage: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    actionButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      margin: 5,
      width: SCREEN_WIDTH / 3 - 30,
      height: SCREEN_WIDTH / 3 - 30,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
    },
    actionText: {
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.text,
    },
  });

export default AvatarPicker;
