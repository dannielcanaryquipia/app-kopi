import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import { Link } from 'expo-router'; // Import Link for navigation

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      

      {/* Footer Text */}
      <Text style={styles.copyrightText}>
        <Icon name="copyright" size={16} color="#ffffff" /> 2024 Kopi Shop
      </Text>

      {/* Social Media Icons */}
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => openLink('https://www.facebook.com')} style={styles.iconButton}>
          <Icon name="facebook" size={22} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.instagram.com')} style={styles.iconButton}>
          <Icon name="instagram" size={22} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.github.com')} style={styles.iconButton}>
          <Icon name="github" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.policyWrapper}>
        <TouchableOpacity>
          <Text style={styles.policyText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> • </Text>
        <TouchableOpacity>
          <Text style={styles.policyText}>Refund Policy</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: '#343131',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 12,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Add spacing between icons and text
  },
  iconButton: {
    marginHorizontal: 10, // Spacing between icons
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
  },
  separator: {
    fontSize: 12,
    color: '#ffffff',
    marginHorizontal: 5,
  },
});

export default Footer;