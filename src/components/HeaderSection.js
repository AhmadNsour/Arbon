import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderSection = ({
  navigation,
  action,
  showSection,
  icon = 'add-outline',
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View>
      {showSection && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <View style={styles.iconHolder}>
              <Icon
                name="person-outline"
                size={24}
                color={theme.colors.white}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.welcome}>Arbon</Text>
          <TouchableOpacity onPress={() => action()}>
            <View style={styles.iconHolder}>
              <Icon name={icon} size={24} color={theme.colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    iconHolder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    welcome: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });

export default HeaderSection;
