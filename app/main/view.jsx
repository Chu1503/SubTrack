import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { Suspense, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { images } from "../../constants";
import { secondary } from "../../constants/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewCard = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const subID = params.subId;
  const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL
  const [subscriptionDetails, setSubscriptionDetails] = useState({});

  const getImageSource = (platform) => {
    const platformName = String(platform);
    const resultString = platformName.replace(/\s+/g, '').toLowerCase();
    switch (resultString.toLowerCase()) {
      case 'primevideo':
        return images.primevideo;
      case 'netflix':
        return images.netflix;
      case 'disney+':
        return images.disneyplus;
      // Add more cases as needed
      default:
        return images.default_icon; // Fallback image
    }
  };


  const calculateNextPaymentDate = (startDate, frequency) => {
    const date = new Date(startDate);

    const freq = String(frequency);

    // Process the frequency string
    if (freq === "monthly") {
      date.setMonth(date.getMonth() + 1);
    } else if (freq === "semi-annually") {
      date.setMonth(date.getMonth() + 6);
    } else if (freq === "annually") {
      date.setFullYear(date.getFullYear() + 1);
    } else if (freq.startsWith("custom:")) {
      const customFreq = freq.split(":")[1];
      const value = parseInt(customFreq, 10);
      const unit = customFreq.replace(value, "");

      if (unit === "d") {
        date.setDate(date.getDate() + value);
      } else if (unit === "m") {
        date.setMonth(date.getMonth() + value);
      } else if (unit === "y") {
        date.setFullYear(date.getFullYear() + value);
      } else {
        console.warn('Unknown custom frequency unit:', unit); // Debugging line
      }
    }
    return date.toLocaleDateString('en-GB');
  };



  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem('user');
      const userData = JSON.parse(user);
      const userId = userData.user.id
      if (subID) {
        try {
          const postData = {
            "user_id": userId,
            "sub_id": subID
          }
          // console.log(postData);
          // Replace with your actual data fetching logic
          const response = await axios.post(`${backend_url}/subDetails`, postData);
          // console.log(response.data);
          setSubscriptionDetails(response.data);
        } catch (error) {
          console.error('Failed to fetch subscription details:', error);
        }
      }
    };

    fetchData();
  }, [router.query]);

  const handleDelete = async () => {
    const user = await AsyncStorage.getItem('user');
    const userData = JSON.parse(user);
    const userId = userData.user.id
    if (subID) {
      try {
        const postData = {
          "user_id": userId,
          "sub_id": subID
        }
        // console.log(postData);
        const response = await axios.post(`${backend_url}/deleteSub`, postData);
        router.replace("/main")
      } catch (error) {
        console.error(error);
      }
    };
  };

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
              source={getImageSource(subscriptionDetails.name)}
              className="w-24 h-24 mb-2 self-center"
            />
            <Text className="text-white text-2xl font-pextrabold mb-4 text-center">
              {subscriptionDetails.name}
            </Text>
            <View className="w-full h-[2px] bg-white/50 mb-4" />
            <View className="w-full pl-2 pr-2">
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-base font-pextrabold">
                  Started on:
                </Text>
                <Text className="text-white text-base font-pmedium">
                  {new Date(subscriptionDetails.start_date).toLocaleDateString('en-GB')}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-base font-pextrabold">
                  Status:
                </Text>
                <Text className="text-white text-base font-pmedium">
                  {subscriptionDetails.status}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-base font-pextrabold">
                  Price:
                </Text>
                <Text className="text-white text-base font-pmedium">₹{subscriptionDetails.price}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-base font-pextrabold">
                  Renewal Period:
                </Text>
                <Text className="text-white text-base font-pmedium">
                  {subscriptionDetails.frequency}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white text-base font-pextrabold">
                  Next Payment Date:
                </Text>
                <Text className="text-white text-base font-pmedium">
                  {calculateNextPaymentDate(subscriptionDetails.start_date, subscriptionDetails.frequency)}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="w-[60px] h-[40px] border-2 border-secondary rounded-full justify-center items-center self-center"
            onPress={() => router.push({ pathname: `/main/edit?subId=${subscriptionDetails.ID}`, params: subscriptionDetails.ID })} // Remove the braces in params}
          >
            <MaterialIcons name="edit" size={24} color="#F4CE14" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-[#D11A2A] p-2 rounded-full mb-7 w-[40vw] self-center justify-center"
            onPress={handleDelete}>
            <MaterialCommunityIcons name="delete-forever" size={30} color="white" />
            <Text className="text-white text-base font-pextrabold text-center">Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewCard;
