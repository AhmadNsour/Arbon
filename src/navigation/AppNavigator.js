import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//screens
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import TransactionsScreen from '@screens/TransactionsScreen';
import DealsScreen from '@screens/DealsScreen';
import MoreScreen from '@screens/MoreScreen';
import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import UpdateProfileScreen from '@screens/UpdateEmailScreen';
import NotificationScreen from '@screens/NotificationScreen';
import PrivacyPolicyScreen from '@screens/PrivacyPolicyScreen';
import ContactUsScreen from '@screens/ContactUsScreen';
import TermsAndConditionsScreen from '@screens/TermsAndConditionsScreen';
import AboutUsScreen from '@screens/AboutUsScreen';
import ConnectionsScreen from '@screens/ConnectionsScreen';
import TransactionDetailsScreen from '@screens/TransactionDetailsScreen';
import ForgetPasswordScreen from '@screens/ForgetPasswordScreen';
import OTPScreen from '@screens/OTPScreen';
import AddConnectionScreen from '@screens/AddConnectionScreen';
import AddConnectionConfirmScreen from '@screens/AddConnectionConfirmScreen';
import QRCodeScannerScreen from '@screens/QRCodeScannerScreen';
import MyQrCode from '@screens/MyQrCode';

//components
import CloseButton from '@components/CloseButton';
import BackArrow from '@components/BackArrow';
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
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          tabBarIcon: getTabBarIcon('pricetags-outline'),
        }}
      />
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{
          tabBarIcon: getTabBarIcon('person-outline'),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
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

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({navigation}) => getProfileOptions(navigation)}
        />
        <Stack.Screen
          name="UpdateEmail"
          component={UpdateProfileScreen}
          options={({navigation}) => getUpdateEmailOptions(navigation, theme)}
        />
        <Stack.Screen
          name="MyQrCode"
          component={MyQrCode}
          options={({navigation}) => getQRCodeOptions(navigation, theme)}
        />
        <Stack.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={({navigation}) => commonScreenOptions(navigation)}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={({navigation}) => commonScreenOptions(navigation)}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Contact Us',
          })}
        />
        <Stack.Screen
          name="AddConnectionScreen"
          component={AddConnectionScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Add Connection',
          })}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'About Us',
          })}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Privacy Policy',
          })}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditionsScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Terms and Conditions',
          })}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetailsScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Transaction Details',
          })}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={({navigation}) => getForgetPassword(navigation)}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={({navigation}) => commonScreenOptions(navigation)}
        />
        <Stack.Screen
          name="AddConnectionConfirmScreen"
          component={AddConnectionConfirmScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'Confirm Connection',
          })}
        />
        <Stack.Screen
          name="QRCodeScannerScreen"
          component={QRCodeScannerScreen}
          options={({navigation}) => ({
            ...commonScreenOptions(navigation),
            title: 'QR Scanner',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
