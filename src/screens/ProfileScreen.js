import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useTheme} from '../theme/ThemeProvider';
import defaultImage from '../assets/images/defaultProfile.png';
import {useSelector} from 'react-redux';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import AvatarPicker from '../components/AvatarPicker';
import ActionSheet from 'react-native-actionsheet';

const ProfileScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('details');
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] =
    useState(false);
  const {theme, setIsDarkMode, isDarkMode} = useTheme();
  const user = useSelector(state => state.user);
  const currentLanguage = useSelector(state => state.language);
  const [profileImage, setProfileImage] = useState(
    user?.profileImage ? {uri: user?.profileImage} : defaultImage,
  );
  const [isAvatarPickerVisible, setIsAvatarPickerVisible] = useState(false);
  const themeActionSheet = useRef();
  const languageActionSheet = useRef();
  const styles = createStyles(theme);

  const toggleFaceID = () =>
    setIsFaceIDEnabled(previousState => !previousState);
  const togglePushNotifications = () =>
    setIsPushNotificationsEnabled(previousState => !previousState);

  const requestPermission = async type => {
    const permission = Platform.select({
      ios:
        type === 'photo'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.IOS.CAMERA,
      android:
        type === 'photo'
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.ANDROID.CAMERA,
    });

    let result = await check(permission);
    if (result !== RESULTS.GRANTED) {
      result = await request(permission);
    }

    return result === RESULTS.GRANTED;
  };

  const showPermissionAlert = message => {
    Alert.alert(
      'Permission Denied',
      message,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Go to Settings',
          onPress: () => openSettings(),
        },
      ],
      {cancelable: true},
    );
  };

  const handleChoosePhoto = async () => {
    const isPermissionGranted = await requestPermission('photo');
    if (!isPermissionGranted) {
      showPermissionAlert('You need to grant permission to access photos.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri};
        setProfileImage(source);
      }
    });
  };

  const handleTakenPicture = async () => {
    const isPermissionGranted = await requestPermission('camera');
    if (!isPermissionGranted) {
      showPermissionAlert('You need to grant permission to use the camera.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
      cameraType: 'front',
      saveToPhotos: true,
      includeBase64: false,
      cropping: true, // Enable cropping
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri};
        setProfileImage(source);
      }
    });
  };

  const handleSelectAvatar = avatar => {
    setProfileImage({uri: avatar});
    setIsAvatarPickerVisible(false);
  };

  const handleReset = () => {
    setProfileImage(defaultImage);
    setIsAvatarPickerVisible(false);
  };

  const handleThemeSelection = index => {
    if (index === 0) {
      setIsDarkMode(false);
    } else if (index === 1) {
      setIsDarkMode(true);
    }
  };

  const handleLanguageSelection = index => {
    console.log('Language Selected;', index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => setIsAvatarPickerVisible(true)}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.name || 'John Doe'}</Text>
          <Text style={styles.lastLogin}>
            Last login: {user?.lastLogin || 'N/A'}
          </Text>
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setSelectedTab('details')}
          style={[styles.tab, selectedTab === 'details' && styles.selectedTab]}>
          <Text style={styles.tabText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('settings')}
          style={[
            styles.tab,
            selectedTab === 'settings' && styles.selectedTab,
          ]}>
          <Text style={styles.tabText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'details' ? (
        <ScrollView style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Full Name</Text>
            <Text style={styles.detailValue}>
              {user?.fullName || 'John Doe'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>National ID</Text>
            <Text style={styles.detailValue}>
              {user?.nationalID || '1234567890'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Mobile Number</Text>
            <Text style={styles.detailValue}>
              {user?.mobile || '1234567890'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Email</Text>
            <Text style={styles.detailValue}>
              {user?.email || 'john.doe@example.com'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Date of Birth</Text>
            <Text style={styles.detailValue}>{user?.dob || '01/01/1980'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Gender</Text>
            <Text style={styles.detailValue}>{user?.gender || 'Male'}</Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.settings}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => languageActionSheet.current.show()}>
            <Text style={styles.settingText}>Language</Text>
            <Text style={styles.settingText}>{currentLanguage}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('UpdateProfile')}>
            <Text style={styles.settingText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => themeActionSheet.current.show()}>
            <Text style={styles.settingText}>Theme</Text>
            <Text style={styles.settingText}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Reset Password</Text>
          </TouchableOpacity>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Face ID</Text>
            <Switch
              value={isFaceIDEnabled}
              onValueChange={toggleFaceID}
              trackColor={{
                false: theme.colors.darkGrayishViolet,
                true: theme.colors.primary,
              }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              value={isPushNotificationsEnabled}
              onValueChange={togglePushNotifications}
              trackColor={{
                false: theme.colors.darkGrayishViolet,
                true: theme.colors.primary,
              }}
            />
          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <AvatarPicker
        visible={isAvatarPickerVisible}
        onClose={() => setIsAvatarPickerVisible(false)}
        onSelect={handleSelectAvatar}
        onReset={handleReset}
        onImageSelect={handleChoosePhoto}
        onTakePhoto={handleTakenPicture}
      />

      <ActionSheet
        ref={themeActionSheet}
        title="Select Theme"
        options={['Light', 'Dark', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={handleThemeSelection}
      />

      <ActionSheet
        ref={languageActionSheet}
        title="Select Language"
        options={['English', 'Arabic', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={handleLanguageSelection}
      />
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
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.background,
      marginRight: 20,
    },
    profileInfo: {
      flex: 1,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 5,
    },
    lastLogin: {
      fontSize: 16,
      color: theme.colors.text,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    selectedTab: {
      borderBottomColor: theme.colors.primary,
    },
    tabText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    details: {
      flex: 1,
      width: '100%',
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
    settings: {
      flex: 1,
      width: '100%',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      height: 60,
    },
    settingText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    logoutButton: {
      padding: 15,
      backgroundColor: theme.colors.danger,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    logoutText: {
      color: theme.colors.text,
      fontSize: 16,
    },
  });

export default ProfileScreen;
