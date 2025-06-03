import React, { useCallback, memo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Easing,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar
} from 'react-native';

const fallbackImage = require('../assets/images/Cappuccino.png');

// Memoize the card component to prevent unnecessary re-renders
const MenuCard = memo(({ item, onPress, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View>
          <Image
            source={hasError ? fallbackImage : item.image} 
            style={[styles.cardImage, !imageLoaded && styles.imageLoading]}
            resizeMode="cover"
            onLoad={() => {
              console.log('Image loaded successfully for:', item.title);
              setImageLoaded(true);
            }}
            onError={(e) => {
              console.log('Error loading image for:', item.title, e.nativeEvent.error);
              setHasError(true);
            }}
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuCategories] = useState([
    {
      id: 1,
      title: 'Hot Beverages',
      description: 'Wide range of Steaming hot coffee to make you fresh and light',
      image: require('../assets/images/hot-beverages.png'),
    },
    {
      id: 2,
      title: 'Cold Beverages',
      description: 'Creamy and frothy cold coffee to make you cool',
      image: require('../assets/images/cold-beverages.png'),
    },
    {
      id: 3,
      title: 'Refreshment',
      description: 'Fruit and icy refreshing drink to make you feel refresh',
      image: require('../assets/images/refreshment.png'),
    },
    {
      id: 4,
      title: 'Special Combos',
      description: 'Your favorite eating and drinking combinations',
      image: require('../assets/images/special-combo.png'),
    },
    {
      id: 5,
      title: 'Dessert',
      description: 'Satiate your palate and take you on a culinary treat',
      image: require('../assets/images/desserts.png'),
    },
    {
      id: 6,
      title: 'Burger & French Fries',
      description: 'Quick bites to satisfy your small size hunger',
      image: require('../assets/images/burger-frenchfries.png'),
    },
  ]);

  const handleCardPress = useCallback((item) => {
    // Handle card press - you can add navigation or other actions here
    console.log('Card pressed:', item.title);
  }, []);

  const renderItem = useCallback(({ item, index }) => (
    <MenuCard 
      item={item} 
      onPress={() => handleCardPress(item)}
      index={index}
    />
  ), [handleCardPress]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const ListHeader = useCallback(() => (
    <Animated.View style={styles.titleWrapper}>
      <Text style={styles.title}>OUR MENU</Text>
    </Animated.View>
  ), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#D8A25E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menuCategories}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.menuList}
        ListHeaderComponent={ListHeader}
        renderItem={renderItem}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        updateCellsBatchingPeriod={50}
        onEndReachedThreshold={0.5}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: 300,
          offset: 300 * index,
          index,
        })}
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: 'PoppinsSemiBold',
  },
  menuList: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 45,
    width: width * 0.5,
  },
  cardImage: {
    width: '100%',
    height: 185,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
    zIndex: 1,
  },
  imageLoading: {
    opacity: 0.5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
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

export default memo(Menu);