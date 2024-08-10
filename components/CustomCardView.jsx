import React from "react";
import { View, Text, Image } from "react-native";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomCardView = () => {
  return (
    <SafeAreaView className="bg-[#161617] h-full">
        {/* <Pressable
          className="w-10 h-10 rounded-full justify-center items-center mr-2"
          onPress={() => router.push("/main")}
        >
          <Ionicons name="chevron-back-sharp" size={30} color="white" />
        </Pressable>
        <Image source={images.logo} className="w-24 h-24 mb-4" />
        <Text className="text-white text-xl font-bold mb-4">
          Subscription Details
        </Text>
        <View className="w-full h-px bg-gray-600 mb-4" />
        <View className="w-full">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white text-base">Price:</Text>
            <Text className="text-white text-base font-bold">Rs. 5</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-white text-base">Renewal Period:</Text>
            <Text className="text-white text-base font-bold">3 days</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white text-base">Next Payment Date:</Text>
            <Text className="text-white text-base font-bold">Aug 5, 2024</Text>
          </View>
        </View> */}
    </SafeAreaView>
  );
};

export default CustomCardView;
