import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useLoading} from '../context/LoadingContext';

const AddConnectionConfirmScreen = ({route, navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {setIsLoading} = useLoading();

  const {firstName, lastName, mobileNumber, gender, email, dateOfBirth} =
    route.params;

  const confirmAddConnection = () => {
    setIsLoading(true);
    // Call API
    // Alert.alert('Success', `Connection with ${firstName} added.`);
    // setIsLoading(false);
    // navigation.navigate('Connections');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>First Name</Text>
          <Text style={styles.detailValue}>{firstName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>Last Name</Text>
          <Text style={styles.detailValue}>{lastName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>Mobile Number</Text>
          <Text style={styles.detailValue}>{mobileNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>Gender</Text>
          <Text style={styles.detailValue}>{gender}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>Email</Text>
          <Text style={styles.detailValue}>{email}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>Date of Birth</Text>
          <Text style={styles.detailValue}>{dateOfBirth}</Text>
        </View>
      </ScrollView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          This data is fetched from SANAD. Please verify the details before
          confirming.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            confirmAddConnection();
          }}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
    detailItem: {
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      height: 60,
    },
    detailText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    detailValue: {
      fontSize: 16,
      color: theme.colors.text,
    },
    infoContainer: {
      padding: 15,
      backgroundColor: theme.colors.lightGray,
      borderRadius: 10,
      marginBottom: 20,
    },
    infoText: {
      fontSize: 14,
      color: theme.colors.text,
      textAlign: 'center',
    },
    buttonContainer: {
      justifyContent: 'flex-end',
    },
    confirmButton: {
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    confirmButtonText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    content: {
      flexGrow: 1,
    },
  });

export default AddConnectionConfirmScreen;
