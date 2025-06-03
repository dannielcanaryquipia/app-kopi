import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import { Link } from 'expo-router'; // Import Link for navigation

const SocialIcon = memo(({ name, url }) => {
  const handlePress = useCallback(async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  }, [url]);

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.iconButton}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Open ${name} social media`}
    >
      <Icon name={name} size={22} color="#ffffff" />
    </TouchableOpacity>
  );
});

const PolicyLink = memo(({ text, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={`Open ${text}`}
  >
    <Text style={styles.policyText}>{text}</Text>
  </TouchableOpacity>
));

const Footer = () => {
  const handlePrivacyPolicy = useCallback(() => {
    // Add privacy policy navigation logic
  }, []);

  const handleRefundPolicy = useCallback(() => {
    // Add refund policy navigation logic
  }, []);

  return (
    <View style={styles.footerContainer}>
      

      {/* Footer Text */}
      <Text style={styles.copyrightText}>
        <Icon name="copyright" size={16} color="#ffffff" /> 2024 Kopi Shop
      </Text>

      {/* Social Media Icons */}
      <View style={styles.iconWrapper}>
        <SocialIcon name="facebook" url="https://www.facebook.com" />
        <SocialIcon name="instagram" url="https://www.instagram.com" />
        <SocialIcon name="github" url="https://www.github.com" />
      </View>

      <View style={styles.policyWrapper}>
        <PolicyLink text="Privacy Policy" onPress={handlePrivacyPolicy} />
        <Text style={styles.separator}> • </Text>
        <PolicyLink text="Refund Policy" onPress={handleRefundPolicy} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: '#343131',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    paddingVertical: 12,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Add spacing between icons and text
  },
  iconButton: {
    marginHorizontal: 10, // Spacing between icons
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    marginBottom: 10,
  },
  policyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  policyText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PoppinsRegular',
    padding: 8,
  },
  separator: {
    fontSize: 12,
    color: '#ffffff',
    marginHorizontal: 5,
  },
});

export default memo(Footer);