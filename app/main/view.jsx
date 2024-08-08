import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { images } from "../../constants";
import { secondary } from "../../constants/colors";

const ViewCard = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="flex-row items-center mt-7">
            <Pressable
              className="w-10 h-10 rounded-full justify-center items-center mr-2"
              onPress={() => router.push("/main")}
            >
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </Pressable>
            <Text className="text-white text-2xl font-bold">
              Subscription Details
            </Text>
          </View>
          <View className="bg-black-100 mt-10 rounded-3xl p-5">
            <Image
              source={images.primevideo}
              className="w-24 h-24 mb-2 self-center"
            />
            <Text className="text-white text-2xl font-pextrabold mb-4 text-center">
              Netflix
            </Text>
            <View className="w-full h-[2px] bg-white/50 mb-4" />
            <View className="w-full pl-2 pr-2">
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-base font-pextrabold">
                  Price:
                </Text>
                <Text className="text-white text-base font-pmedium">Rs. 5</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-base font-pextrabold">
                  Renewal Period:
                </Text>
                <Text className="text-white text-base font-pmedium">
                  3 days
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white text-base font-pextrabold">
                  Next Payment Date:
                </Text>
                <Text className="text-white text-base font-pmedium">
                  Aug 5, 2024
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
              className="w-[60px] h-[40px] border-2 border-secondary rounded-full justify-center items-center self-center"
              onPress={() => router.push('/main/edit')}
            >
              <MaterialIcons name="edit" size={24} color="#F4CE14" />
            </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-[#D11A2A] p-2 rounded-full mb-7 w-[40vw] self-center justify-center">
        <MaterialCommunityIcons name="delete-forever" size={30} color="white" />
        <Text className="text-white text-base font-pextrabold text-center">Delete</Text>
      </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewCard;
