import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

//screens
import Home from '@screens/Home';
import Profile from '@screens/Profile';
import Transactions from '@screens/Transactions';
import Deals from '@screens/Deals';
import More from '@screens/More';
import Login from '@screens/Login';
import SignUp from '@screens/SignUp';
import Onboarding from '@screens/Onboarding';
import UpdateProfile from '@screens/UpdateEmail';
import Notification from '@screens/Notification';
import PrivacyPolicy from '@screens/PrivacyPolicy';
import ContactUs from '@screens/ContactUs';
import TermsAndConditions from '@screens/TermsAndConditions';
import AboutUs from '@screens/AboutUs';
import Connections from '@screens/Connections';
import TransactionDetails from '@screens/TransactionDetails';
import ForgetPassword from '@screens/ForgetPassword';
import OTP from '@screens/OTP';
import AddConnection from '@screens/AddConnection';
import AddConnectionConfirm from '@screens/AddConnectionConfirm';
import QRCodeScanner from '@screens/QRCodeScanner';
import QrCode from '@screens/QrCode';
import AppInfo from '@screens/AppInfo';
import ResetSettings from '@screens/ResetSettings';
import Finance from '@screens/Finance';

//components
import CloseButton from '@components/CloseButton';
import BackArrow from '@components/BackArrow';

//hooks
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useTheme} from '@theme/ThemeProvider';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarIcon = ({name, color, size}) => (
  <Icon name={name} color={color} size={size} />
);

const getTabBarIcon =
  iconName =>
  ({color, size}) =>
    <TabBarIcon name={iconName} color={color} size={size} />;

const HomeTabNavigator = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarIcon: getTabBarIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name="Deals"
        component={Deals}
        options={{
          tabBarIcon: getTabBarIcon('pricetags-outline'),
        }}
      />
      <Tab.Screen
        name="Connections"
        component={Connections}
        options={{
          tabBarIcon: getTabBarIcon('person-outline'),
        }}
      />
      <Tab.Screen
        name="Finance"
        component={Finance}
        options={{
          tabBarIcon: getTabBarIcon('card-outline'),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: getTabBarIcon('menu-outline'),
        }}
      />
    </Tab.Navigator>
  );
};

const getProfileOptions = navigation => ({
  presentation: 'modal',
  headerTitle: 'Profile',
  headerLeft: () => null,
  headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
});

const getForgetPassword = navigation => ({
  presentation: 'modal',
  headerTitle: 'Forget Password',
  headerLeft: () => null,
  headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
});

const getUpdateEmailOptions = navigation => ({
  presentation: 'modal',
  headerTitle: 'Update Email',
  headerLeft: () => null,
  headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
});
const getQRCodeOptions = navigation => ({
  presentation: 'modal',
  headerTitle: 'QR Code',
  headerLeft: () => null,
  headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
});

const commonScreenOptions = navigation => ({
  headerLeft: () => <BackArrow onPress={() => navigation.goBack()} />,
  headerRight: () => null,
});

const AppNavigator = () => {
  const {theme} = useTheme();
  const isFirstTimeUser = useSelector(state => state.settings.isFirstTimeUser);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstTimeUser ? 'onboarding' : 'home'}
        screenOptions={{
          gestureEnabled: Platform.OS === 'ios',
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.colors.text,
        }}>
        <Stack.Screen
          name="home"
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />
        {/* onboarding start*/}
        <Stack.Screen
          name="onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        {/* onboarding end*/}

        {/* profile start*/}
        <Stack.Screen
          name="profile"
          component={Profile}
          options={({navigation}) => getProfileOptions(navigation)}
        />
        <Stack.Screen
          name="updateEmail"
          component={UpdateProfile}
          options={({navigation}) => getUpdateEmailOptions(navigation, theme)}
        />
        <Stack.Screen
          name="QrCode"
          component={QrCode}
          options={({navigation}) => getQRCodeOptions(navigation, theme)}
        />
        <Stack.Screen
          name="forgetPassword"
          component={ForgetPassword}
          options={({navigation}) => getForgetPassword(navigation)}
        />
        {/* profile end */}

        {/* notification start */}
        <Stack.Screen
          name="notifications"
          component={Notification}
          options={({navigation}) => commonScreenOptions(navigation)}
        />
        {/* notification end*/}

        {/* more start*/}
        <Stack.Screen
          name="contactUs"
          component={ContactUs}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Contact Us',
          })}
        />
        <Stack.Screen
          name="aboutUs"
          component={AboutUs}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'About Us',
          })}
        />
        <Stack.Screen
          name="privacyPolicy"
          component={PrivacyPolicy}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Privacy Policy',
          })}
        />
        <Stack.Screen
          name="termsAndConditions"
          component={TermsAndConditions}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Terms and Conditions',
          })}
        />
        <Stack.Screen
          name="appInfo"
          component={AppInfo}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'App Info',
          })}
        />
        {/* more end */}

        {/* connection start*/}
        <Stack.Screen
          name="addConnectionScreen"
          component={AddConnection}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Add Connection',
          })}
        />
        <Stack.Screen
          name="addConnectionConfirmScreen"
          component={AddConnectionConfirm}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Confirm Connection',
          })}
        />
        <Stack.Screen
          name="qrCodeScannerScreen"
          component={QRCodeScanner}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'QR Scanner',
          })}
        />
        {/* connection end*/}

        {/* transaction start*/}
        <Stack.Screen
          name="transactionDetails"
          component={TransactionDetails}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Transaction Details',
          })}
        />
        <Stack.Screen
          name="transactions"
          component={Transactions}
          options={({navigation}) => commonScreenOptions(navigation)}
        />
        {/* transaction end*/}

        {/* general start */}
        <Stack.Screen
          name="otp"
          component={OTP}
          options={({navigation}) => commonScreenOptions(navigation)}
        />
        <Stack.Screen
          name="resetSettings"
          component={ResetSettings}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Reset Settings',
          })}
        />
        {/* general end */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
