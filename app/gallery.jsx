import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: require('../assets/images/gallery-1.jpg'),
    },
    {
      id: 2,
      image: require('../assets/images/gallery-2.jpg'),
    },
    {
      id: 3,
      image: require('../assets/images/gallery-3.jpg'),
    },
    {
      id: 4,
      image: require('../assets/images/gallery-4.jpg'),
    },
    {
      id: 5,
      image: require('../assets/images/gallery-5.jpg'),
    },
    {
      id: 6,
      image: require('../assets/images/gallery-6.jpg'),
    },
  ];

  // Create a ref for each gallery item
  const scales = galleryItems.map(() => new Animated.Value(1));

  const handlePressIn = (index) => {
    Animated.spring(scales[index], {
      toValue: 1.1, // Zoom in
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(scales[index], {
      toValue: 1, // Reset to original size
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback
      onPressIn={() => handlePressIn(index)}
      onPressOut={() => handlePressOut(index)}
    >
      <Animated.View style={[styles.galleryItem, { transform: [{ scale: scales[index] }] }]}>
        <Image source={item.image} style={styles.galleryImage} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Kopi</Text>
      </View>

      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Gallery</Text>
      </View>

      {/* Gallery List */}
      <FlatList
        data={galleryItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.galleryList}
        showsVerticalScrollIndicator={false}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'Poppins-Regular',
  },
  titleWrapper: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    fontFamily: 'Poppins-Bold',
  },
  galleryList: {
    paddingHorizontal: 10,
  },
  galleryItem: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    padding: 0, // Remove padding to make the image cover the card
    width: width - 40, // Full width with padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Add shadow for Android
  },
  galleryImage: {
    width: '100%', // Full width of the item
    height: 200, // Fixed height for images
    resizeMode: 'cover', // Ensure the image covers the card
  },
});

export default Gallery;