import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  AccessibilityInfo, 
  Pressable,
  Platform,
  FlatList
} from 'react-native';
import { Link, usePathname, useRouter } from 'expo-router';
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

// Create animated components
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedView = Animated.createAnimatedComponent(View);

const NavLink = React.memo(({ item, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.navLink, isActive && styles.activeNavLink]}
    activeOpacity={0.7}
    accessibilityRole="link"
    accessibilityLabel={`Navigate to ${item.label} page`}
  >
    <Text style={[
      styles.navLinkText,
      isActive && styles.activeNavLinkText
    ]}>{item.label}</Text>
  </TouchableOpacity>
));

const NavBar = ({ onClose }) => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { route: '/', label: 'Home' },
    { route: '/about', label: 'About' },
    { route: '/menu', label: 'Menu' },
    { route: '/testimonials', label: 'Testimonials' },
    { route: '/gallery', label: 'Gallery' },
    { route: '/contact', label: 'Contact' },
  ];

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

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleLinkPress = useCallback((route) => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: -width,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (isScreenReaderEnabled) {
        AccessibilityInfo.announceForAccessibility(`Navigating to ${route} page`);
      }
      router.replace(route);
    });
  }, [isScreenReaderEnabled, router, slideAnim, fadeAnim]);

  const renderItem = useCallback(({ item }) => (
    <NavLink
      item={item}
      isActive={pathname === item.route}
      onPress={() => handleLinkPress(item.route)}
    />
  ), [pathname, handleLinkPress]);

  const keyExtractor = useCallback((item) => item.route, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <AnimatedView 
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Close menu"
          accessibilityRole="button"
        />
      </AnimatedView>

      <AnimatedView 
        style={[
          styles.navMenu,
          { transform: [{ translateX: slideAnim }] },
        ]}
        accessibilityViewIsModal={true}
        accessibilityRole="menu"
      >
        <AnimatedFlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          initialNumToRender={menuItems.length}
          maxToRenderPerBatch={menuItems.length}
          windowSize={3}
          removeClippedSubviews={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  navMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: NAV_MENU_WIDTH,
    height: height,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
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
    paddingTop: 60,
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