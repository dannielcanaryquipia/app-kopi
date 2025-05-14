import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, AccessibilityInfo, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const colors = {
  white: '#ffffff',
  dark: '#343131',
  primary: '#A04747',
  secondary: '#D8A25E',
  lightpink: '#faf4f5',
  mediumgray: '#cccccc',
  overlay: 'rgba(0,0,0,0.25)',
};

const NAV_MENU_WIDTH = width * 0.8;

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-width)).current;
  const pathname = usePathname();

  // Check if screen reader is enabled
  useEffect(() => {
    const checkScreenReader = async () => {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setIsScreenReaderEnabled(isEnabled);
    };

    checkScreenReader();
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderEnabled
    );

    return () => subscription.remove();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    if (menuOpen) {
      toggleMenu();
    }
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    const toValue = menuOpen ? -width : 0;
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
    setMenuOpen(!menuOpen);
  }, [menuOpen, slideAnim]);

  const handleLinkPress = useCallback((route) => {
    setMenuOpen(false);
    // Announce navigation for screen readers
    if (isScreenReaderEnabled) {
      AccessibilityInfo.announceForAccessibility(`Navigating to ${route} page`);
    }
  }, [isScreenReaderEnabled]);

  const menuItems = [
    { route: '/', label: 'Home' },
    { route: '/about', label: 'About' },
    { route: '/menu', label: 'Menu' },
    { route: '/testimonials', label: 'Testimonials' },
    { route: '/gallery', label: 'Gallery' },
    { route: '/contact', label: 'Contact' },
  ];

  return (
    <View style={styles.navbar} pointerEvents={menuOpen ? 'box-none' : 'auto'}>
      {/* Logo */}
      <Link href="/" style={styles.logoLink}>
        <Text 
          style={styles.logoText}
          accessibilityRole="header"
          accessibilityLabel="Kopi Coffee Shop"
        >
          Kopi
        </Text>
      </Link>

      {/* Menu Toggle Button */}
      {!menuOpen && (
        <TouchableOpacity 
          onPress={toggleMenu} 
          style={styles.menuToggle}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={menuOpen ? "Close menu" : "Open menu"}
          accessibilityHint="Opens the navigation menu"
        >
          <Ionicons name={menuOpen ? 'close' : 'menu'} size={28} color="#cccccc" />
        </TouchableOpacity>
      )}

      {/* Overlay barrier */}
      {menuOpen && (
        <Pressable
          style={styles.overlay}
          onPress={toggleMenu}
          accessibilityLabel="Close menu"
          accessibilityRole="button"
        />
      )}

      {/* Menu */}
      <Animated.View 
        style={[
          styles.navMenu,
          { transform: [{ translateX: slideAnim }] },
        ]}
        accessibilityViewIsModal={menuOpen}
        accessibilityRole="menu"
        pointerEvents={menuOpen ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={toggleMenu}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        >
          <Ionicons name="close" size={20} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.menuContent}>
          {menuItems.map((item) => (
            <Link
              key={item.route}
              href={item.route} 
              style={[
                styles.navLink,
                pathname === item.route && styles.activeNavLink
              ]}
              onPress={() => handleLinkPress(item.label)}
              accessibilityRole="link"
              accessibilityLabel={`Navigate to ${item.label} page`}
            >
              <Text style={[
                styles.navLinkText,
                pathname === item.route && styles.activeNavLinkText
              ]}>{item.label}</Text>
            </Link>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1000,
  },
  logoLink: {
    textDecorationLine: 'none',
  },
  logoText: {
    color: colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'PoppinsSemiBold',
  },
  menuToggle: {
    padding: 10,
    zIndex: 1001,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: NAV_MENU_WIDTH,
    width: width - NAV_MENU_WIDTH,
    height: height,
    backgroundColor: colors.overlay,
    zIndex: 998,
  },
  navMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: NAV_MENU_WIDTH,
    height: height,
    backgroundColor: colors.white,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderRightWidth: 1,
    borderRightColor: colors.mediumgray,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 1002,
    padding: 8,
  },
  menuContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 18,
  },
  navLink: {
    paddingVertical: 10,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  activeNavLink: {
    backgroundColor: colors.lightpink,
  },
  navLinkText: {
    color: colors.dark,
    fontSize: 20,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  activeNavLinkText: {
    color: colors.primary,
    fontFamily: 'PoppinsSemiBold',
  },
});

export default React.memo(NavBar);