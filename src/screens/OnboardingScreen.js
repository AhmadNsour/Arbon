// src/screens/OnboardingScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to Arbon',
      image: 'https://example.com/onboarding1.png',
    },
    {
      title: 'Manage Your Money',
      image: 'https://example.com/onboarding2.png',
    },
    {
      title: 'Stay on Top of Your Finances',
      image: 'https://example.com/onboarding3.png',
    },
  ];

  return (
    <ScrollView horizontal pagingEnabled style={styles.container}>
      {slides.map((slide, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{uri: slide.image}} style={styles.image} />
          <Text style={styles.title}>{slide.title}</Text>
          {index < slides.length - 1 && (
            <TouchableOpacity onPress={() => setCurrentSlide(index + 1)}>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
          )}
          {index === slides.length - 1 && (
            <View style={styles.buttons}>
              <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
              />
              <Button
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  slide: {
    width: 300,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skip: {
    color: '#008467',
    marginTop: 20,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OnboardingScreen;
