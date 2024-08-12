import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter, useLocalSearchParams } from "expo-router";
import { images } from "../../constants";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewCard = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const subID = params.subId;
  const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL;
  const [subscriptionDetails, setSubscriptionDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getImageSource = (platform) => {
    const platformName = String(platform);
    const resultString = platformName.replace(/\s+/g, "").toLowerCase();
    switch (resultString.toLowerCase()) {
      case "primevideo":
        return images.primevideo;
      case "netflix":
        return images.netflix;
      case "disney+hotstar":
        return images.disneyplus;
      case "sonyliv":
        return images.sonyliv;
      case "applemusic":
        return images.applemusic;
      case "spotify":
        return images.spotify;
      case "googleone":
        return images.googleone;
      case "amazonmusic":
        return images.amazonmusic;
      case "airtel":
        return images.airtel;
      case "jio":
        return images.jio;
      case "vodafoneidea":
        return images.vi;
      case "dropbox":
        return images.dropbox;
      case "airtelxstream":
        return images.xstream;
      case "tatasky":
        return images.tatasky;
      case "jiosaavn":
        return images.saavn;
      case "youtubepremium":
        return images.youtube;
      case "surfshark":
        return images.surfshark;
      case "crunchyroll":
        return images.crunchyroll;
      case "focisbroadband":
        return images.ficus;
      case "actfibernet":
        return images.act;
      case "swiggy":
        return images.swiggy;
      case "zomato":
        return images.zomato;
      case "zee5":
        return images.zee5;
      case "jiocinema":
        return images.jiocinema;
      case "chu":
        return images.chuImage;
      case "manav":
        return images.manavImage;
      // Add more cases as needed
      default:
        return null; // Fallback to null if no image is found
    }
  };

  // Function to render fallback view
  const renderFallbackView = (platform) => {
    const platformName = String(platform);
    return (
      // <View className="items-center bg-black-100 rounded-3xl p-5 border-2 border-black w-[100px] h-[100px] self-center mb-2">
      <Text className="text-white text-6xl font-pregular">
        {platformName.charAt(0)}
      </Text>
      // </View>
    );
  };

  const checkItemExists = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Error accessing item in AsyncStorage:', error);
      return false;
    }
  };

  const formatCustomFrequency = (freq) => {
    if (typeof freq === "string" && freq.startsWith("custom:")) {
      const customFreq = freq.split(":")[1];
      const value = parseInt(customFreq, 10);
      const unit = customFreq.replace(value, "");

      if (unit === "d") {
        return `${value} days`;
      } else if (unit === "m") {
        return `${value} months`;
      } else if (unit === "y") {
        return `${value} years`;
      } else {
        console.warn("Unknown custom frequency unit:", unit); // Debugging line
        return freq;
      }
    }
    return freq;
  };

  const calculateNextPaymentDate = (startDate, frequency) => {
    const date = new Date(startDate);
    const freq = String(frequency);

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
        console.warn("Unknown custom frequency unit:", unit); // Debugging line
      }
    }
    return {
      date: date.toLocaleDateString("en-GB"),
      formattedFrequency: formatCustomFrequency(frequency),
    };
  };

  const fetchData = async () => {
    const user = await AsyncStorage.getItem("user");
    const userData = JSON.parse(user);
    const userId = userData.user.id;
    if (subID) {
      try {
        const postData = {
          user_id: userId,
          sub_id: subID,
        };
        const response = await axios.post(
          `${backend_url}/subDetails`,
          postData
        );
        setSubscriptionDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch subscription details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => { 
    const checkAndFetchSubscription = async () => {   
      const result = await checkItemExists("subDetails");
        if (result) {
          const subscription = result.find(sub => sub.ID === subID);
          if (subscription) {
            // Set the subscription details
            setSubscriptionDetails(subscription);
            // console.log(subscription)
          } else {
            console.log('Subscription ID not found in AsyncStorage.');
            await fetchData(); // Fetch data if the ID is not found
          }
          // setSubscriptionDetails(result);
          setLoading(false); // Stop loading after the data is fetched or if an error occurs
        } else {
          fetchData();
        }
      };

      checkAndFetchSubscription();
  }, [router.query]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this subscription?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const user = await AsyncStorage.getItem("user");
            const userData = JSON.parse(user);
            const userId = userData.user.id;

            if (subID) {
              try {
                const postData = {
                  user_id: userId,
                  sub_id: subID,
                };
                const response = await axios.post(
                  `${backend_url}/deleteSub`,
                  postData
                );
                await AsyncStorage.removeItem('subDetails');
                router.replace("/main");
              } catch (error) {
                console.error(error);
              }
            }
          },
        },
      ]
    );
  };

  const { date: nextPaymentDate, formattedFrequency } =
    calculateNextPaymentDate(
      subscriptionDetails.start_date,
      subscriptionDetails.frequency
    );

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
            {loading ? (
              <View className="flex-1 justify-center items-center h-full">
                <ActivityIndicator
                  size="xl"
                  color="#F4CE14"
                  className="flex-1 justify-center align-middle"
                />
              </View>
            ) : (
              <>
                {getImageSource(subscriptionDetails.name) ? (
                  <Image
                    source={getImageSource(subscriptionDetails.name)}
                    className="w-24 h-24 mb-2 self-center rounded-3xl"
                  />
                ) : (
                  <View className="items-center bg-black-100 rounded-3xl p-5 border-2 border-black w-[100px] h-[100px] self-center mb-2">
                    {renderFallbackView(subscriptionDetails.name)}
                  </View>
                )}
                <Text className="text-white text-2xl font-pextrabold mb-4 text-center">
                  {subscriptionDetails.name}
                </Text>
                <View className="w-full h-[2px] bg-white/50 mb-4" />
                <View className="w-full pl-2 pr-2">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-white text-base font-pextrabold">
                      Status:
                    </Text>
                    <View className="flex-row items-center">
                      {subscriptionDetails.status === "active" ? (
                        <AntDesign name="checkcircle" size={24} color="green" />
                      ) : subscriptionDetails.status === "expired" ? (
                        <MaterialIcons name="cancel" size={24} color="red" />
                      ) : null}
                      <Text className="text-white text-base font-pmedium ml-1">
                        {subscriptionDetails.status.charAt(0).toUpperCase() +
                          subscriptionDetails.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-white text-base font-pextrabold">
                      Started on:
                    </Text>
                    <Text className="text-white text-base font-pmedium">
                      {new Date(
                        subscriptionDetails.start_date
                      ).toLocaleDateString("en-GB")}
                    </Text>
                  </View>

                  <View className="flex-row justify-between mb-2">
                    <Text className="text-white text-base font-pextrabold">
                      Price:
                    </Text>
                    <Text className="text-white text-base font-pmedium">
                      ₹{subscriptionDetails.price}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-white text-base font-pextrabold">
                      Renewal Period:
                    </Text>
                    <Text className="text-white text-base font-pmedium">
                      {formattedFrequency === "semi-annually"
                        ? "Semi-Annually"
                        : formattedFrequency.charAt(0).toUpperCase() +
                          formattedFrequency.slice(1)}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-white text-base font-pextrabold">
                      Next Payment Date:
                    </Text>
                    <Text className="text-white text-base font-pmedium">
                      {nextPaymentDate}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
          <View className="flex-row justify-between mt-5">
            <TouchableOpacity
              className="flex-row items-center bg-[#D11A2A] p-2 rounded-full mb-7 w-[40vw] self-center justify-center"
              onPress={handleDelete}
            >
              <MaterialCommunityIcons
                name="delete-forever"
                size={30}
                color="white"
              />
              <Text className="text-white text-base font-pextrabold text-center ml-2">
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center bg-[#F4CE14] p-2 rounded-full mb-7 w-[40vw] self-center justify-center"
              onPress={() =>
                router.push({
                  pathname: `/main/edit?subId=${subscriptionDetails.ID}`,
                  params: subscriptionDetails.ID,
                })
              }
            >
              <Feather name="edit" size={30} color="black" />
              <Text className="text-black text-base font-pextrabold text-center ml-2">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewCard;
