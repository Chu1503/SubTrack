import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Welcome() {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError(null);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      router.replace("main");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-start items-center px-4 mt-28">
          <Image
            source={images.logoIcon}
            className="w-[150px] h-[150px] mb-3"
            resizeMode="contain"
          />
          <Image
            source={images.logoText}
            className="w-3/4 h-[84px]"
            resizeMode="contain"
          />
        </View>
        <View className="flex-grow justify-end items-center px-4 pb-8">
          <View className="relative mt-5 w-full">
            <Text className="text-[45px] text-white font-bold text-left p-2">
              Manage all your subscriptions {"\n"}
              <Text className="text-secondary">in one place!</Text>
            </Text>
          </View>
          <CustomButton
            title="Sign in with Google"
            handlePress={signIn}
            containerStyles="w-full mt-7"
            textStyles="ml-2"
          >
            <AntDesign name="google" size={30} color="#161622" className="mr-2" />
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
