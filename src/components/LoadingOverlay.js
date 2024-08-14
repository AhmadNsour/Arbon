import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {useLoading} from '@context/LoadingContext';
import {useTheme} from '@theme/ThemeProvider';

const LoadingOverlay = () => {
  const {isLoading} = useLoading();
  const {theme} = useTheme();

  return (
    <Modal
      visible={isLoading}
      transparent={true}
      animationType="none"
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoadingOverlay;
