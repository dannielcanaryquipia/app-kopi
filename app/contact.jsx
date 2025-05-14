import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/Footer'; // Import the Footer component
const Contact = () => {
  const contactInfo = [
    {
      id: 1,
      icon: 'map-marker',
      text: 'Zone 8, Bulan, Sorsogon, Philippines 4706',
    },
    {
      id: 2,
      icon: 'envelope',
      text: 'kopigroup@gmail.com',
    },
    {
      id: 3,
      icon: 'phone',
      text: '(123) 456-78909',
    },
    {
      id: 4,
      icon: 'clock-o',
      text: 'Monday - Friday: 9:00 AM - 5:00 PM',
    },
    {
      id: 5,
      icon: 'clock-o',
      text: 'Saturday: 10:00 AM - 3:00 PM',
    },
    {
      id: 6,
      icon: 'clock-o',
      text: 'Sunday: Closed',
    },
  ];

  const renderContactInfo = ({ item }) => (
    <View style={styles.contactInfo}>
      <Icon name={item.icon} size={20} color="#343131" style={styles.contactIcon} />
      <Text style={styles.contactText}>{item.text}</Text>
    </View>
  );

  return (
    <FlatList
      data={contactInfo}
      renderItem={renderContactInfo}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <View>
          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Contact Us</Text>
          </View>

          {/* Contact Form */}
          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Your name" placeholderTextColor="#aaa" />
            <TextInput style={styles.input} placeholder="Your email" placeholderTextColor="#aaa" keyboardType="email-address" />
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Your message"
              placeholderTextColor="#aaa"
              multiline
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      ListFooterComponent={<Footer />} // Add the Footer component here
    />
  );
};

const colors = {
  white: '#ffffff',
  dark: '#343131',
  primary: '#A04747',
  secondary: '#D8A25E',
  lightpink: '#faf4f5',
  mediumgray: '#cccccc',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
  },
  contentContainer: {
    padding: 20,
  },
  titleWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 20, // Ensure the title is visible
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000', // Use black for better visibility
    fontFamily: 'PoppinsBold',
    paddingTop: 50,
  },
  form: {
    marginBottom: 70,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.mediumgray,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: 'center',
    width: '40%',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 18,
    color: colors.dark,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
});

export default Contact;