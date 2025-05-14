import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const About = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Kopi</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.content}>
        {/* About Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/images/about.jpg')} // Replace with your actual image path
            style={styles.image}
          />
        </View>

        {/* About Title */}
        <Text style={styles.title}>ABOUT US</Text>

        {/* About Content */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            At Kopi in Bulan, Sorsogon, we take pride in being the ultimate destination for coffee lovers and those who
            cherish meaningful conversations. Nestled in the heart of our vibrant town, we're dedicated to crafting
            exceptional coffee experiences in a warm and welcoming atmosphere. Whether you're here to savor the rich
            flavors of our brews or simply unwind in a cozy space, Kopi offers the perfect setting to relax, connect,
            and make every visit special.
          </Text>
        </View>

        {/* Social Media Icons */}
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => openLink('https://www.facebook.com')}>
            <Ionicons name="logo-facebook" size={22} color="#A04747" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com')}>
            <Ionicons name="logo-instagram" size={22} color="#A04747" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.github.com')}>
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
  header: {
    width: '100%',
    height: 75,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 32,
    color: colors.secondary,
    fontFamily: 'PoppinsRegular',
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
    borderRadius: 80, // Circular image
    resizeMode: 'cover',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'PoppinsBold',
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    width: width * 0.9,
  },
  cardText: {
    fontSize: 16,
    color: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    lineHeight: 32,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
});

export default About;