import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  Animated,
  ActivityIndicator,
  Platform
} from 'react-native';

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
    feedback: '"Loved the French roast. Perfectly balanced and rich. Will order again!"',
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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DOT_SIZE = 12;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + 4;

const TestimonialCard = React.memo(({ item, index, scrollX }) => {
  const [isLoading, setIsLoading] = useState(true);
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];

  const scale = scrollX.current.interpolate({
    inputRange,
    outputRange: [0.98, 1, 0.98],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.current.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View 
      style={[
        styles.card,
        {
          transform: [{ scale }],
          opacity,
        }
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={item.image} 
          style={styles.image}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.secondary} />
          </View>
        )}
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.feedback}>{item.feedback}</Text>
    </Animated.View>
  );
});

const Testimonials = () => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false);
    });
  }, []);

  const renderItem = useCallback(({ item, index }) => (
    <TestimonialCard
      item={item}
      index={index}
      scrollX={scrollX}
    />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.absoluteTitleWrapper} pointerEvents="none">
        <Text style={styles.title}>TESTIMONIALS</Text>
      </View>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}> 
        <AnimatedFlatList
          data={testimonials}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={width * 0.92}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX.current } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
          removeClippedSubviews={Platform.OS === 'android'}
          ListHeaderComponent={<View style={{ height: 80 }} />}
          pagingEnabled
          bounces={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: colors.lightpink,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightpink,
    paddingTop: 60, // for header
  },
  absoluteTitleWrapper: {
    position: 'absolute',
    top: 60, // below header
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    pointerEvents: 'none',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    fontFamily: 'PoppinsSemiBold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 10,
    width: width * 0.92,
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    // No shadow, no border
    borderWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mediumgray,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.dark,
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
  },
  feedback: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.dark,
    lineHeight: 22,
    paddingHorizontal: 10,
    fontStyle: 'italic',
    fontFamily: 'PoppinsRegular',
  },
});

export default React.memo(Testimonials);