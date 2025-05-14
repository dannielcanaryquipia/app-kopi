// filepath: c:\Users\Danniel Canary\Desktop\appkopi\components\Header.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.header}>
      <Link href="/NavBar" style={styles.menuButton}>
        <Text style={styles.headerText}>Kopi</Text>
        <Ionicons name="menu" size={28} color="#ffffff" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#A04747',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 3, // Ensure the header is above other content
  },
  headerText: {
    color: '#D8A25E',
    fontSize: 32,
    fontname: 'PoppinsRegular',
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    color: '#D8A25E',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Header;