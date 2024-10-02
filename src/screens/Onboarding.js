import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {useTheme} from '@theme/ThemeProvider';
import {SCREEN_WIDTH} from '@utils/helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import {toggleIsFirstTimeUser} from '@store/actions/settingsActions';

const slides = [
  {
    title: 'Welcome to Our App',
    description: 'Explore the best features of our application.',
    image: require('@assets/images/onboarding1.png'),
  },
  {
    title: 'Secure Transactions',
    description:
      'Payments are held in escrow until the service or product is received.',
    image: require('@assets/images/onboarding2.png'),
  },
  {
    title: 'Rating System',
    description:
      'Both buyers and sellers can rate each other post-transaction.',
    image: require('@assets/images/onboarding3.png'),
  },
  {
    title: 'Identity Verification',
    description: 'Ensures participants use verified identities.',
    image: require('@assets/images/onboarding4.png'),
  },
  {
    title: 'Get Started',
    description: 'Sign up or login to get started.',
    image: require('@assets/images/onboarding4.png'),
  },
];

const OnboardingScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      navigation.navigate('login');
    }
  };

  const handleSkip = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current.scrollTo({
        x: 4 * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      navigation.navigate('login');
    }
  };

  const onScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.round(contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return slides.map((_, index) => {
      const opacity = scrollX.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp',
      });

      return <Animated.View key={index} style={[styles.dot, {opacity}]} />;
    });
  };

  const setIsFirstTimeUser = route => {
    setIsModalVisible(false);
    dispatch(toggleIsFirstTimeUser(previousState => !previousState));
    navigation.navigate(route);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: route}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false, listener: onScroll},
        )}
        scrollEventThrottle={16}>
        {slides.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots and Buttons */}
      <View style={styles.footer}>
        {currentIndex < slides.length - 1 ? (
          <>
            <View style={styles.dotContainer}>{renderDots()}</View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.lastSlideButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsModalVisible(true)}>
              <Text style={styles.buttonText}>Lets Start</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}>
        <View
          style={
            Platform.OS === 'ios'
              ? styles.iosModalContent
              : styles.androidModalContent
          }>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              setIsFirstTimeUser('login');
            }}>
            <View style={styles.card}>
              <Text style={styles.modalItemText}>Login</Text>
              <Icon
                name="log-in-outline"
                size={24}
                color={theme.colors.primary}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              setIsModalVisible(false);
              setIsFirstTimeUser('signUp');
            }}>
            <View style={styles.card}>
              <Text style={styles.modalItemText}>Register</Text>
              <Icon
                name="person-add-outline"
                size={24}
                color={theme.colors.primary}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    slide: {
      width: SCREEN_WIDTH,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    image: {
      width: '80%',
      height: '45%',
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: SCREEN_WIDTH * 0.8,
    },
    lastSlideButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: SCREEN_WIDTH * 0.8,
      marginTop: 20,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
      marginHorizontal: 10,
    },
    buttonText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    skipButton: {
      padding: 10,
    },
    nextButton: {
      padding: 10,
    },
    skipText: {
      fontSize: 18,
      color: theme.colors.text,
    },
    nextText: {
      fontSize: 18,
      color: theme.colors.primary,
    },
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      marginHorizontal: 5,
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    iosModalContent: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
    },
    androidModalContent: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
    },
    modalItem: {
      padding: 15,
      width: '100%',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'row',
      padding: 20,
      backgroundColor: theme.colors.background,
      marginBottom: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.border,
      height: 65,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      width: '100%',
      alignItems: 'center',
    },
    icon: {
      marginRight: 10,
    },
    modalItemText: {
      fontSize: 18,
      color: theme.colors.primary,
      flex: 1,
      textAlign: 'center',
    },
  });

export default OnboardingScreen;
