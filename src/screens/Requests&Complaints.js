import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';

const ComplaintScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [requestType, setRequestType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);

  const [isRequestTypeDropdownVisible, setRequestTypeDropdownVisible] =
    useState(false);
  const [isCategoryDropdownVisible, setCategoryDropdownVisible] =
    useState(false);

  const maxDescriptionLength = 250;

  const requestTypes = ['Request', 'Complain'];
  const categories = [
    'Add Money',
    'Send Arbon',
    'Release Arbon',
    'Transactions',
    'Wallet',
    'Connection',
    'Profile',
    'Notification',
    'Theme',
    'General',
  ];

  const handleDescriptionChange = value => {
    if (value.trim() === '') {
      setDescription('');
      setDescriptionLength(0);

      return;
    }
    if (value.length <= maxDescriptionLength) {
      setDescription(value);
      setDescriptionLength(value.length);
    }
  };

  const handleSubmit = () => {
    if (requestType && category && description) {
      // Handle submission logic
      console.log('Submitted:', {requestType, category, description});
      navigation.goBack(); // or show a success message
    } else {
      alert('Please fill all fields');
    }
  };

  const renderDropdownItem = (item, setSelected, setVisible, selectedValue) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.dropdownItem,
        selectedValue === item && styles.selectedDropdownItem, // Highlight selected option
      ]}
      onPress={() => {
        setSelected(item);
        setVisible(false);
      }}>
      <Text
        style={[
          styles.dropdownItemText,
          selectedValue === item && styles.selectedDropdownItemText, // Change text color of selected option
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const closeDropdowns = () => {
    setRequestTypeDropdownVisible(false);
    setCategoryDropdownVisible(false);
    Keyboard.dismiss(); // Dismiss the keyboard if open
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <View style={styles.container}>
        {/* Request Type Dropdown */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Request Type</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() =>
              setRequestTypeDropdownVisible(!isRequestTypeDropdownVisible)
            }>
            <Text style={styles.dropdownText}>
              {requestType || 'Select request type...'}
            </Text>
          </TouchableOpacity>
          {isRequestTypeDropdownVisible && (
            <View style={styles.dropdownContent}>
              {requestTypes.map(item =>
                renderDropdownItem(
                  item,
                  setRequestType,
                  setRequestTypeDropdownVisible,
                  requestType,
                ),
              )}
            </View>
          )}
        </View>

        {/* Category Dropdown */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Category</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() =>
              setCategoryDropdownVisible(!isCategoryDropdownVisible)
            }>
            <Text style={styles.dropdownText}>
              {category || 'Select category...'}
            </Text>
          </TouchableOpacity>
          {isCategoryDropdownVisible && (
            <View style={styles.dropdownContent}>
              {categories.map(item =>
                renderDropdownItem(
                  item,
                  setCategory,
                  setCategoryDropdownVisible,
                  category,
                ),
              )}
            </View>
          )}
        </View>

        {/* Description Text Area */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter your description..."
            value={description}
            multiline
            placeholderTextColor={theme.colors.text + '80'}
            maxLength={maxDescriptionLength}
            onChangeText={handleDescriptionChange}
          />
          <Text style={styles.helperText}>
            {descriptionLength}/{maxDescriptionLength} characters
          </Text>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              requestType && category && description
                ? styles.submitButton
                : styles.submitButtonDisabled
            }
            disabled={
              requestType === '' || category === '' || description === ''
            }
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 20,
    },
    inputWrapper: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    dropdown: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      padding: 15,
    },
    dropdownText: {
      color: theme.colors.text,
    },
    dropdownPlaceholderText: {
      color: theme.colors.text,
      opacity: 0.5,
    },
    dropdownContent: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      marginTop: 5,
    },
    dropdownItem: {
      padding: 15,
    },
    dropdownItemText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    selectedDropdownItem: {
      backgroundColor: theme.colors.primary,
    },
    selectedDropdownItemText: {
      color: theme.colors.white,
    },
    textArea: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      height: 150,
      backgroundColor: theme.colors.background,
      textAlignVertical: 'top',
      color: theme.colors.text,
    },
    helperText: {
      marginTop: 5,
      fontSize: 12,
      color: theme.colors.text,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },
    submitButtonDisabled: {
      backgroundColor: theme.colors.darkGrayishViolet,
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },
    submitButtonText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ComplaintScreen;
