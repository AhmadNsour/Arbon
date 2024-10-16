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
import TermsAndConditions from '@screens/Terms&Conditions';
import AboutUs from '@screens/AboutUs';
import Connections from '@screens/Connections';
import TransactionDetails from '@screens/TransactionDetails';
import ResetPassword from '@screens/ResetPassword';
import OTP from '@screens/OTP';
import AddConnection from '@screens/AddConnection';
import ReviewConnection from '@screens/ReviewConnection';
import QRCodeScanner from '@screens/QRCodeScanner';
import QrCode from '@screens/QrCode';
import GeneralInformation from '@screens/GeneralInformation';
import ResetSettings from '@screens/ResetSettings';
import Wallet from '@screens/Wallet';
import Request_ComplaintScreen from '@screens/Requests&Complaints';
import ConnectionDetailsScreen from '@screens/ConnectionDetails';

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
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: getTabBarIcon('wallet-outline'),
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

const getResetPassword = navigation => ({
  presentation: 'modal',
  headerTitle: 'Forget Password',
  headerLeft: () => null,
  headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
});

const getUpdateEmailOptions = navigation => ({
  presentation: 'modal',
  headerTitle: 'Update Email Address',
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
          name="resetPassword"
          component={ResetPassword}
          options={({navigation}) => getResetPassword(navigation)}
        />
        {/* profile end */}

        {/* notification start */}
        <Stack.Screen
          name="notifications"
          component={Notification}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Notifications',
          })}
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
          name="terms&Conditions"
          component={TermsAndConditions}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Terms & Conditions',
          })}
        />
        <Stack.Screen
          name="generalInformation"
          component={GeneralInformation}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'General Information',
          })}
        />
        <Stack.Screen
          name="request_complaint"
          component={Request_ComplaintScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Requests & Complaints',
          })}
        />
        {/* more end */}

        {/* connection start*/}
        <Stack.Screen
          name="addConnection"
          component={AddConnection}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Add Connection',
          })}
        />
        <Stack.Screen
          name="reviewConnection"
          component={ReviewConnection}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Connection Review',
          })}
        />
        <Stack.Screen
          name="qrCodeScanner"
          component={QRCodeScanner}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'QR Scanner',
          })}
        />
        <Stack.Screen
          name="ConnectionDetails"
          component={ConnectionDetailsScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Connection Details',
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
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Transactions',
          })}
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
