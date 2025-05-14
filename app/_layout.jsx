import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import { View, ActivityIndicator, Text, LogBox } from 'react-native';
import NavBar from './NavBar'; // Import NavBar

// Suppress specific warnings that might affect production
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#343131' }}>
          <Text style={{ color: '#D8A25E', fontSize: 18, fontFamily: 'PoppinsSemiBold', marginBottom: 10 }}>
            Oops! Something went wrong
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'PoppinsRegular', textAlign: 'center' }}>
            Please try restarting the app
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#343131' }}>
    <ActivityIndicator size="large" color="#D8A25E" />
  </View>
);

const Layout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        Miniver: require('../assets/fonts/Miniver-Regular.ttf'),
        PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'), // Adjust the path
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    } catch (err) {
      setError('Failed to load fonts. Please restart the app.');
      console.error('Font loading error:', err);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#343131' }}>
        <Text style={{ color: '#D8A25E', fontSize: 16, fontFamily: 'PoppinsRegular', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <NavBar />
        <Suspense fallback={<LoadingScreen />}>
          <Stack
            screenOptions={{
              headerShown: false, // Hide the header globally for all screens
              headerStyle: { backgroundColor: '#343131' },
              headerTintColor: '#ffffff',
              headerTitleStyle: { 
                fontFamily: 'PoppinsSemiBold',
                fontSize: 18
              },
              contentStyle: { backgroundColor: '#ffffff' },
              animation: 'slide_from_right',
              animationDuration: 200,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              fullScreenGestureEnabled: true,
            }}
          />
        </Suspense>
      </View>
    </ErrorBoundary>
  );
};

export default React.memo(Layout);