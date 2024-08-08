import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack, Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const RootLayout = () => {
  const [isSignedIn, setIsSignedIn] = useState(null); // Change to null initially
  const [fontsLoaded, error] = useFonts({
    "TT-Norms-Pro-Black": require("../assets/fonts/TT-Norms-Pro-Black.otf"),
    "TT-Norms-Pro-Bold": require("../assets/fonts/TT-Norms-Pro-Bold.otf"),
    "TT-Norms-Pro-ExtraBold": require("../assets/fonts/TT-Norms-Pro-ExtraBold.otf"),
    "TT-Norms-Pro-ExtraLight": require("../assets/fonts/TT-Norms-Pro-ExtraLight.otf"),
    "TT-Norms-Pro-Light": require("../assets/fonts/TT-Norms-Pro-Light.otf"),
    "TT-Norms-Pro-Medium": require("../assets/fonts/TT-Norms-Pro-Medium.otf"),
    "TT-Norms-Pro-Regular": require("../assets/fonts/TT-Norms-Pro-Regular.otf"),
    "TT-Norms-Pro-SemiBold": require("../assets/fonts/TT-Norms-Pro-SemiBold.otf"),
    "TT-Norms-Pro-Thin": require("../assets/fonts/TT-Norms-Pro-Thin.otf"),
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = await AsyncStorage.getItem('user');
      console.log('User from AsyncStorage:', user);
      setIsSignedIn(!!user);
    };
    checkAuthStatus();
  }, []);
  
  if (!fontsLoaded && !error) {
    return null;
  }

  // Show loading overlay if authentication state is not determined yet
  if (isSignedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style='light' />
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="main" options={{ headerShown: false }} />
      </Stack>
      {isSignedIn ? <Redirect href="/main" /> : <Redirect href="/welcome" />}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // or any color you prefer
  },
});

export default RootLayout;