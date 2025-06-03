import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const About = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/images/about.jpg')}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>ABOUT US</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            At Kopi in Bulan, Sorsogon, we take pride in being the ultimate destination for coffee lovers and those who
            cherish meaningful conversations. Nestled in the heart of our vibrant town, we're dedicated to crafting
            exceptional coffee experiences in a warm and welcoming atmosphere. Whether you're here to savor the rich
            flavors of our brews or simply unwind in a cozy space, Kopi offers the perfect setting to relax, connect,
            and make every visit special.
          </Text>
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconSpacing} onPress={() => openLink('https://www.facebook.com')}>
            <Ionicons name="logo-facebook" size={22} color="#A04747" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSpacing} onPress={() => openLink('https://www.instagram.com')}>
            <Ionicons name="logo-instagram" size={22} color="#A04747" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSpacing} onPress={() => openLink('https://www.github.com')}>
            <Ionicons name="logo-github" size={22} color="#A04747" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const colors = {
  white: '#faf4f5',
  dark: '#343131',
  primary: '#A04747',
  secondary: '#D8A25E',
  black: '#000000',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 159,
    height: 159,
    borderRadius: 80,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'PoppinsSemiBold',
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    width: width * 0.9,
  },
  cardText: {
    fontSize: 16,
    color: colors.dark,
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    lineHeight: 32,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconSpacing: {
    marginHorizontal: 10,
  },
});

export default About;