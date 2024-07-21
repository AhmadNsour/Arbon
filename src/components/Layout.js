import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Layout = ({children}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <StatusBar barStyle={'dark-content'} />
      {children}
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
  });

export default Layout;
