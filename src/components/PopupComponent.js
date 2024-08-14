import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';

const PopupComponent = ({
  title,
  subTitle,
  textToShow,
  visible,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
  showCancelButton = false,
  showCloseIcon = true,
  dismissible = false,
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme, showCancelButton);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => {
          if (dismissible) {
            if (showCancelButton) {
              onCancel();
            }
            onConfirm();
          }
        }}>
        <View style={styles.popupContainer}>
          {showCloseIcon && (
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
                <Icon name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          {title && <Text style={styles.subTitle}>{subTitle}</Text>}
          <Text style={styles.text}>{textToShow}</Text>
          <View style={styles.buttonContainer}>
            {showCancelButton && (
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>{cancelButtonText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>{confirmButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const createStyles = (theme, showCancelButton) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
    },
    header: {
      width: '100%',
      alignItems: 'flex-end',
    },
    closeButton: {
      padding: 5,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    subTitle: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cancelButton: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.colors.lightRed,
      borderRadius: 10,
      alignItems: 'center',
      marginRight: 10,
    },
    confirmButton: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginLeft: showCancelButton ? 10 : 0,
    },
    cancelButtonText: {
      color: theme.colors.danger,
      fontWeight: 'bold',
    },
    confirmButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default PopupComponent;
