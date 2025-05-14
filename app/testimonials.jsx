import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Paolo Gutlay',
      feedback: '"Excellent quality! Fresh beans and quick delivery. Highly recommend."',
      image: require('../assets/images/user1.jpg'),
    },
    {
      id: 2,
      name: 'Wilbert Duque',
      feedback: '"Best decaf I\'ve tried! Smooth and flavorful. Arrived promptly."',
      image: require('../assets/images/user2.jpg'),
    },
    {
      id: 3,
      name: 'JanJan Dayta',
      feedback: '"Fantastic mocha flavor. Fresh and aromatic. Quick shipping!"',
      image: require('../assets/images/user3.jpeg'),
    },
    {
      id: 4,
      name: 'Jhon Mark Candia',
      feedback: '"Loved the French roast. Perfectly balanced and rich. Will order again!""',
      image: require('../assets/images/user4.jpg'),
    },
    {
      id: 5,
      name: 'Danniel Canary Quipia',
      feedback: '"Great espresso blend! Smooth and bold flavor. Fast shipping too!"',
      image: require('../assets/images/user5.jpg'),
    },
    {
      id: 6,
      name: 'Reynaldo Porteros',
      feedback: '"Impressed with the variety! Each blend has its own unique taste. Highly recommend!"',
      image: require('../assets/images/user6.jpg'),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.feedback}>{item.feedback}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Kopi</Text>
      </View>

      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Testimonials</Text>
      </View>

      {/* Horizontal FlatList */}
      <FlatList
        data={testimonials}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').width * 0.8 + 20} // Adjust for card width + spacing
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const colors = {
  white: '#ffffff',
  dark: '#343131',
  primary: '#A04747',
  secondary: '#D8A25E',
  lightpink: '#faf4f5',
  mediumgray: '#cccccc',
  transparent: 'transparent',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  header: {
    width: '100%',
    height: 75,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 32,
    color: colors.secondary,
    fontFamily: 'PoppinsRegular',
  },
  titleWrapper: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark,
    fontFamily: 'PoppinsBold',
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: colors.lightpink, // Match the background color
    borderRadius: 10, // Add slight rounding for better aesthetics
    alignItems: 'center',
    marginHorizontal: 20,
    width: width * 0.8, // Card width is 80% of the screen width
    justifyContent: 'center', // Center content vertically
  },
  image: {
    width: 160, // Increase image size
    height: 160, // Increase image size
    borderRadius: 80, // Make the image circular
    marginBottom: 20, // Add spacing below the image
  },
  name: {
    fontSize: 24, // Increase font size for better readability
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.dark,
    textAlign: 'center',
  },
  feedback: {
    fontSize: 18, // Increase font size for better readability
    textAlign: 'center',
    color: colors.dark,
    lineHeight: 24, // Add line height for better spacing
    paddingHorizontal: 10, // Add padding for better alignment
    fontStyle: 'italic', // Italicize the feedback text
    fontFamily: 'PoppinsRegular',
  },
});

export default Testimonials;