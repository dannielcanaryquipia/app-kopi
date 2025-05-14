import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Menu = () => {
  // Data for mapping
  const menuCategories = [
    {
      id: 1,
      title: 'Hot Beverages',
      description: 'Wide range of Steaming hot coffee to make you fresh and light',
      image: require('../assets/images/hot-beverages.png'), // Replace with your actual image path
      alt: 'Hot beverages',
    },
    {
      id: 2,
      title: 'Cold Beverages',
      description: 'Creamy and frothy cold coffee to make you cool',
      image: require('../assets/images/cold-beverages.png'),
      alt: 'Cold beverages',
    },
    {
      id: 3,
      title: 'Refreshment',
      description: 'Fruit and icy refreshing drink to make you feel refresh',
      image: require('../assets/images/refreshment.png'),
      alt: 'Refreshment',
    },
    {
      id: 4,
      title: 'Special Combos',
      description: 'Your favorite eating and drinking combinations',
      image: require('../assets/images/special-combo.png'),
      alt: 'Special combo',
    },
    {
      id: 5,
      title: 'Dessert',
      description: 'Satiate your palate and take you on a culinary treat',
      image: require('../assets/images/desserts.png'),
      alt: 'Desserts',
    },
    {
      id: 6,
      title: 'Burger & French Fries',
      description: 'Quick bites to satisfy your small size hunger',
      image: require('../assets/images/burger-frenchfries.png'),
      alt: 'Burger frenchfries',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Kopi</Text>
        <Ionicons name="menu" size={24} color="#ffffff" />
      </View>

      

      {/* Scrollable Content */}
      <FlatList
        data={menuCategories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuList}
        ListHeaderComponent={
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>OUR MENU</Text>
            </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} alt={item.alt} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        )}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    width: '100%',
    height: 75,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 32,
    color: colors.secondary,
    fontFamily: 'PoppinsRegular',
  },
  titleWrapper: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: 'PoppinsBold',
  },
  menuList: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 45,
    width: width * .5, // Card width is 80% of the screen width
  },
  cardImage: {
    width: '100%', // Image width matches the card width
    height: 185, // Fixed height for all images
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover', // Ensures the image covers the area without distortion
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    marginBottom: 15,
  },
  cardDescription: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    lineHeight: 25,
  },
});

export default Menu;