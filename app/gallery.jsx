import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableWithoutFeedback, 
  Animated,
  ActivityIndicator,
  ImageBackground,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');
const colors = {
  white: '#ffffff',
  dark: '#343131',
  primary: '#A04747',
  secondary: '#D8A25E',
  lightpink: '#faf4f5',
};

const galleryItems = [
  { id: 1, image: require('../assets/images/gallery-1.jpg') },
  { id: 2, image: require('../assets/images/gallery-2.jpg') },
  { id: 3, image: require('../assets/images/gallery-3.jpg') },
  { id: 4, image: require('../assets/images/gallery-4.jpg') },
  { id: 5, image: require('../assets/images/gallery-5.jpg') },
  { id: 6, image: require('../assets/images/gallery-6.jpg') },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const GalleryItem = React.memo(({ item, index, onPressIn, onPressOut, scale }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => onPressIn(index)}
      onPressOut={() => onPressOut(index)}
    >
      <Animated.View style={[styles.galleryItem, { transform: [{ scale }] }]}>
        <ImageBackground
          source={item.image}
          style={styles.galleryImage}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        >
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.secondary} />
            </View>
          )}
          {hasError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load image</Text>
            </View>
          )}
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scales = useRef(galleryItems.map(() => new Animated.Value(1))).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false);
    });
  }, []);

  const handlePressIn = useCallback((index) => {
    Animated.spring(scales[index], {
      toValue: 0.95,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback((index) => {
    Animated.spring(scales[index], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = useCallback(({ item, index }) => (
    <GalleryItem
      item={item}
      index={index}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      scale={scales[index]}
    />
  ), [handlePressIn, handlePressOut]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const ListHeader = useCallback(() => (
    <Animated.View style={[styles.titleWrapper, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Gallery</Text>
    </Animated.View>
  ), [fadeAnim]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <AnimatedFlatList
        data={galleryItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.galleryList}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={Platform.OS === 'android'}
        updateCellsBatchingPeriod={50}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: 230,
          offset: 230 * index,
          index,
        })}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark,
    fontFamily: 'PoppinsSemiBold',
  },
  galleryList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  galleryItem: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    width: width - 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  galleryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
  },
});

export default React.memo(Gallery);