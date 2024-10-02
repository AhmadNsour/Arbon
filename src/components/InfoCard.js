import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useTheme} from '@theme/ThemeProvider';

const InfoCard = ({iconName, title, description}) => {
  const {theme, isDarkMode} = useTheme();
  const styles = createStyles(theme);
  const showScreenOverview = useSelector(
    state => state.settings.showScreenOverview,
  );

  return (
    <>
      {showScreenOverview ? (
        <View style={styles.cardContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name={iconName}
              size={50}
              color={isDarkMode ? theme.colors.white : theme.colors.primary}
              style={styles.icon}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      ) : null}
    </>
  );
};
const createStyles = theme =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: 30,
    },
    iconContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      padding: 15,
      marginBottom: 15,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.white,
      marginBottom: 10,
    },
    description: {
      fontSize: 14,
      color: theme.colors.white,
      //textAlign: 'center',
      lineHeight: 20, // Controls the space between lines
      textAlign: 'justify',
    },
  });

export default InfoCard;
