// filepath: c:\Users\Danniel Canary\Desktop\appkopi\components\Header.jsx
import React, { useCallback, memo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated, StatusBar } from 'react-native';
import { Link, usePathname, useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleMenuPress = useCallback(() => {
    if (pathname === '/NavBar') {
      router.back();
    } else {
      router.push('/NavBar');
    }
  }, [pathname, router]);

  return (
    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
      <Text 
        style={styles.headerText}
        accessibilityRole="header"
        accessibilityLabel="Kopi Coffee Shop"
      >
        Kopi
      </Text>
      <TouchableOpacity 
        onPress={handleMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={pathname === '/NavBar' ? "Close menu" : "Open menu"}
        accessibilityHint={pathname === '/NavBar' ? "Closes the navigation menu" : "Opens the navigation menu"}
      >
        <Ionicons 
          name={pathname === '/NavBar' ? "close" : "menu"} 
          size={28} 
          color="#ffffff" 
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60 + (StatusBar.currentHeight || 0),
    backgroundColor: '#A04747',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight || 0,
    zIndex: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoLink: {
    textDecorationLine: 'none',
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerText: {
    color: '#D8A25E',
    fontSize: 32,
    fontFamily: 'PoppinsSemiBold',
  },
  menuButton: {
    padding: 10,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Header);