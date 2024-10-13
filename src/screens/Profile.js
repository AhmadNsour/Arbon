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
  Modal,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import ActionSheet from 'react-native-actionsheet';
import {useTranslation} from 'react-i18next';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  setLanguage,
  toggleFaceId,
  togglePushNotification,
} from '@store/actions/settingsActions';
import AvatarPicker from '@components/AvatarPicker';
import {useTheme} from '@theme/ThemeProvider';
import defaultImage from '@assets/images/defaultProfile.png';
import {useLoading} from '@context/LoadingContext';

const ProfileScreen = ({navigation}) => {
  const {i18n} = useTranslation();
  const {setIsLoading} = useLoading();
  const [selectedTab, setSelectedTab] = useState('details');
  const {theme, isDarkMode, toggleThemeMode} = useTheme();
  const user = useSelector(state => state.user);
  const settings = useSelector(state => state.settings);
  const [profileImage, setProfileImage] = useState(
    user?.profileImage ? {uri: user?.profileImage} : defaultImage,
  );
  const [isAvatarPickerVisible, setIsAvatarPickerVisible] = useState(false);
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const themeActionSheet = useRef();
  const languageActionSheet = useRef();
  const styles = createStyles(theme);
  const dispatch = useDispatch();

  const toggleFaceID = () => {
    dispatch(toggleFaceId(previousState => !previousState));
    Alert.alert(
      !settings.faceIdEnabled
        ? 'Enabled Successfully!'
        : 'Disabled Successfully!',
    );
  };

  const togglePushNotifications = () => {
    dispatch(togglePushNotification(previousState => !previousState));
    Alert.alert(
      !settings.pushNotificationEnabled
        ? 'Enabled Successfully!'
        : 'Disabled Successfully!',
    );
  };

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
      cropping: true,
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
      toggleThemeMode();
    } else if (index === 1) {
      toggleThemeMode();
    }
  };

  const handleLanguageSelection = index => {
    if (index === 0) {
      i18n.changeLanguage('en');
      dispatch(setLanguage('en'));
    } else if (index === 1) {
      i18n.changeLanguage('ar');
      dispatch(setLanguage('ar'));
    }
  };

  const renderStars = rate => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rate)) {
        stars.push(
          <Icon key={i} name="star" size={16} color={theme.colors.primary} />,
        );
      } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
        stars.push(
          <Icon
            key={i}
            name="star-half"
            size={16}
            color={theme.colors.primary}
          />,
        );
      } else {
        stars.push(
          <Icon
            key={i}
            name="star-outline"
            size={16}
            color={theme.colors.primary}
          />,
        );
      }
    }
    return stars;
  };

  const navigateToQRCodeScreen = () => {
    navigation.navigate('QrCode');
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            setIsLoading(true);
            navigation.navigate('login');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'login'}],
              }),
            );
            setIsLoading(false);
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => setIsAvatarPickerVisible(true)}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.name || 'Ahmad Al Nsour'}</Text>
          <TouchableOpacity
            style={styles.rateContainer}
            onPress={() => setIsRateModalVisible(true)}>
            <Text style={styles.rateText}>Rate: </Text>
            {renderStars(user?.rate || 4.5)}
          </TouchableOpacity>
          <Text style={styles.lastLogin}>
            Last login: {user?.lastLogin || 'N/A'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.qrCodeSection}
        onPress={navigateToQRCodeScreen}>
        <View style={styles.qrCodeContent}>
          <Icon name="qr-code-outline" size={30} color={theme.colors.primary} />
          <Text style={styles.qrCodeText}>My QR Code</Text>
        </View>
      </TouchableOpacity>
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
              {user?.fullName || 'Ahmad Al Nsour'}
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
              {user?.mobile || '0797433919'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Email</Text>
            <Text style={styles.detailValue}>
              {user?.email || 'ahmadmhnsour@gmail.com'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Date of Birth</Text>
            <Text style={styles.detailValue}>{user?.dob || '12/08/1993'}</Text>
          </View>
          {/* QR Code Section */}
        </ScrollView>
      ) : (
        <ScrollView style={styles.settings}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => languageActionSheet.current.show()}>
            <Text style={styles.settingText}>Language</Text>
            <Text style={styles.settingText}>
              {settings.language === 'en' ? 'English' : 'عربي'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => themeActionSheet.current.show()}>
            <Text style={styles.settingText}>Theme</Text>
            <Text style={styles.settingText}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('updateEmail')}>
            <Text style={styles.settingText}>Update Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('updatePassword')}>
            <Text style={styles.settingText}>Update Password</Text>
          </TouchableOpacity>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Face ID</Text>
            <Switch
              value={settings.faceIdEnabled}
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
              value={settings.pushNotificationEnabled}
              onValueChange={togglePushNotifications}
              trackColor={{
                false: theme.colors.darkGrayishViolet,
                true: theme.colors.primary,
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setDeleteAccountModalVisible(true)}>
            <Text style={styles.settingText}>Delete Account</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => handleLogout()}>
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

      <Modal
        visible={isRateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsRateModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate Information</Text>
            <Text style={styles.modalText}>
              Your rating is based on several factors including transaction
              history, reliability, and feedback from other users.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsRateModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={deleteAccountModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteAccountModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete my Account</Text>
            <Text style={styles.modalText}>
              If you want to delete your account, please contact us at
              support@arbon.com
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDeleteAccountModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      marginBottom: 20,
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
    rateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    rateText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    rateValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginRight: 5,
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
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
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
    qrCodeSection: {
      padding: 10,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 20,
    },
    qrCodeContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    qrCodeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginLeft: 10,
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
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
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
      marginBottom: 20,
    },
    logoutText: {
      color: theme.colors.white,
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '70%',
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    modalCloseButton: {
      padding: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    modalCloseButtonText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ProfileScreen;
