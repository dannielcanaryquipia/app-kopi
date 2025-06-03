import React, { useMemo, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

const colors = {
  white: '#ffffff',
  dark: '#343131',
  primary: '#A04747',
  secondary: '#D8A25E',
  lightPink: '#faf4f5',
};

const HomeSection = () => {
  const { width, height } = Dimensions.get('window');
  const isLargeScreen = width > 900;
  const router = useRouter();

  const handleOrderNow = useCallback(() => {
    router.push('/gallery');
  }, [router]);

  const handleContactUs = useCallback(() => {
    router.push('/contact');
  }, [router]);

  const styles = useMemo(() => StyleSheet.create({
    heroSection: {
      flex: 1,
      backgroundColor: colors.dark,
      minHeight: height,
    },
    sectionContent: {
      flex: 1,
      flexDirection: isLargeScreen ? 'row' : 'column-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    heroDetails: {
      flex: 1,
      alignItems: isLargeScreen ? 'flex-start' : 'center',
      paddingHorizontal: isLargeScreen ? 0 : 20,
    },
    title: {
      color: colors.secondary,
      fontSize: isLargeScreen ? 40 : 32,
      fontFamily: 'Miniver',
      marginBottom: 20,
      textAlign: isLargeScreen ? 'left' : 'center',
    },
    subtitle: {
      color: colors.white,
      fontSize: isLargeScreen ? 40 : 28,
      fontFamily: 'PoppinsSemiBold',
      maxWidth: isLargeScreen ? '70%' : '100%',
      marginBottom: 20,
      textAlign: isLargeScreen ? 'left' : 'center',
    },
    description: {
      color: colors.white,
      fontSize: 16,
      fontFamily: 'PoppinsRegular',
      maxWidth: isLargeScreen ? '70%' : '100%',
      marginBottom: 40,
      textAlign: isLargeScreen ? 'left' : 'center',
      lineHeight: 24,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: isLargeScreen ? 'flex-start' : 'center',
      gap: isLargeScreen ? 50 : 20,
      flexWrap: 'wrap',
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 26,
      borderRadius: 30,
      borderWidth: 2,
      minWidth: 120,
      minHeight: 50,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    orderNow: {
      backgroundColor: colors.secondary,
      borderColor: 'transparent',
    },
    contactUs: {
      backgroundColor: 'transparent',
      borderColor: colors.white,
    },
    orderNowText: {
      color: colors.primary,
      fontFamily: 'PoppinsSemiBold',
      fontSize: 16,
    },
    contactUsText: {
      color: colors.white,
      fontFamily: 'PoppinsSemiBold',
      fontSize: 16,
    },
    heroImageWrapper: {
      flex: 1,
      maxWidth: isLargeScreen ? 500 : width * 0.8,
      marginRight: isLargeScreen ? 30 : 0,
      marginBottom: isLargeScreen ? 0 : 30,
      borderRadius: 20,
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    blurOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 20,
    },
  }), [width, height, isLargeScreen]);

  return (
    <View style={styles.heroSection}>
      <View style={styles.sectionContent}>
        <View style={styles.heroDetails}>
          <Text style={styles.title}>Bulan's Best Coffee</Text>
          <Text style={styles.subtitle}>A coffee that tastes better, stays forever!</Text>
          <Text style={styles.description}>
            Welcome to Kopi, where every taste tells a story and every cup sparks joy.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.orderNow]}
              onPress={handleOrderNow}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Order Now"
            >
              <Text style={styles.orderNowText}>Order Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.contactUs]}
              onPress={handleContactUs}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Contact Us"
            >
              <Text style={styles.contactUsText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heroImageWrapper}>
          <Image
            source={require('../assets/images/Cappuccino.png')}
            style={styles.heroImage}
            resizeMode="contain"
            fadeDuration={0}
          />
          {Platform.OS === 'ios' && (
            <BlurView
              style={styles.blurOverlay}
              intensity={50}
              tint="dark"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(HomeSection);