import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';

const WhatsNew = ({iconName, description, screenName}) => {
  const {theme, isDarkMode} = useTheme();
  const styles = createStyles(theme);

  //mock data for now to call api later
  const [showScreenOverview, setShowScreenOverview] = useState({
    deals: {
      visible: true,
      Content:
        'Manage and review your financial deals, both sent and received. Easily track transaction history, view details of each deal, and create new deals for a seamless financial experience.',
    },
    connections: {
      visible: true,
      Content:
        'Easily manage your connections. Add new contacts manually or by QR code, view saved contacts. Stay in control of your network with options to edit, delete, or quickly send requests to any connection.',
    },
    wallet: {
      visible: true,
      Content:
        'Manage your linked bank accounts and cards for seamless transactions. Add new accounts or cards, view details, and remove old payment methods.',
    },
    more: {
      visible: true,
      Content:
        'Explore additional options and settings. View policies, and more.',
    },
    notification: {
      visible: true,
      Content: '',
    },
  });

  //mock data

  const handleOnClose = () => {
    setShowScreenOverview(prevState => ({
      ...prevState,
      [screenName]: {...prevState[screenName], visible: false},
    }));
  };

  return (
    <>
      {showScreenOverview[screenName].visible ? (
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={handleOnClose} style={styles.closeIcon}>
            <Icon name="close-outline" size={30} color={theme.colors.white} />
          </TouchableOpacity>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon
                name="megaphone"
                size={30}
                color={isDarkMode ? theme.colors.white : theme.colors.primary}
              />
            </View>
          </View>
          <Text style={styles.title}>What`s new?</Text>
          <Text style={styles.description}>
            {showScreenOverview[screenName].Content}
          </Text>
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
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
    },
    closeIcon: {
      position: 'absolute',
      right: 10,
      top: 10,
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
      lineHeight: 20,
      textAlign: 'center',
    },
  });

export default WhatsNew;
