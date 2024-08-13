import React, { useState, useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { usePushNotifications } from "../constants/useNotifications";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { expoPushToken, notification } = usePushNotifications();
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
      SplashScreen.hideAsync();
    };
    checkAuthStatus();
  }, []);
  

    // Ensure expoPushToken is initialized before use
    useEffect(() => {
      if (expoPushToken && expoPushToken.data) {
        console.log(expoPushToken.data);
      }
    }, [expoPushToken]);

  // Check if either fonts are still loading or authentication status is not yet determined
  if (loading || !fontsLoaded || isSignedIn === null) {
    return (
      <View className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="xl" color="#F4CE14" />
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, animation:'none' }} />
        <Stack.Screen name="main" options={{ headerShown: false, animation:'slide_from_right' }} />
      </Stack>
      {isSignedIn ? <Redirect href="/main" /> : <Redirect href="/" />}
    </>
  );
};

export default RootLayout;