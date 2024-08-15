import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { images } from "../../constants";
import CustomCard from "../../components/CustomCard";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const calculateMonthlyPrice = (subscriptions) => {
  return subscriptions.reduce((total, subscription) => {
    let monthlyPrice = 0;

    switch (subscription.frequency) {
      case "monthly":
        monthlyPrice = subscription.price;
        break;
      case "annually":
        monthlyPrice = subscription.price / 12;
        break;
      case "semi-annually":
        monthlyPrice = subscription.price / 6;
        break;
      default:
        if (subscription.frequency.startsWith("custom:")) {
          const customFrequency = subscription.frequency.split(":")[1];
          const unit = customFrequency.slice(-1);
          const amount = parseInt(customFrequency.slice(0, -1), 10);

          if (unit === "d" && amount) {
            monthlyPrice = (subscription.price / amount) * 30;
          } else if (unit === "m" && amount) {
            monthlyPrice = subscription.price / amount;
          } else if (unit === "y" && amount) {
            monthlyPrice = subscription.price / (amount * 12);
          }
        }
        break;
    }

    return total + monthlyPrice;
  }, 0);
};

const Home = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [userName, setuserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false); // Add this state
  const router = useRouter();

  const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const checkExpoToken = async (token) => {
    const user = await AsyncStorage.getItem("user");
    if(user){
    const userData = JSON.parse(user);
    const userId = userData.user.id;
    try {
      const response = await axios.get(`${backend_url}/service/${userId}`);
      const token_data = response.data.expoToken;
      const platforms = response.data.services;
      if (token !== token_data){
        console.log("token not equal")
        const post_data = {
          user_id: userId,
          custom: { services: platforms, expoToken: JSON.parse(token) },
        };
        try {
          const response = await axios.post(
            `${backend_url}/service`,
            post_data
          );
          console.log("Response from server:", response.data);
        } catch (error) {
          console.error("Failed to update token:", error);
        }
      }
    } catch (error) {
      console.error("Failed to fetch custom:", error);
    }
  }
  };

  const checkAuthStatus = async () => {
    const user = await AsyncStorage.getItem("user");
    const tokenString = await AsyncStorage.getItem("expoPushToken");
    checkExpoToken(tokenString);
    const token = JSON.parse(tokenString);
    if (!user) {
      setIsSignedIn(false);
      router.replace("/");
    } else {
      const userData = JSON.parse(user); // Parse the stored user data
      const userName = userData.user.givenName;
      const userId = userData.user.id;
      const userEmail = userData.user.email;
      setuserName(userName);
      console.log(userId);
      console.log(userName);

      try {
        const response = await axios.post(`${backend_url}/user`, {
          id: userId,
          email: userEmail,
          body: { services: [], expoToken: token },
        });
        console.log("User creation response:", response.data);
        // Handle successful user creation (if needed)
      } catch (err) {
        if (err.response.data === "User already exists") {
          console.log(err.response.data + " in the DB");
        }
      }
    }
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

  const setItemToAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Item successfully set in AsyncStorage');
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error);
    }
  };

  const fetchSubscriptions = async () => {
    setLoading(true); // Start loading before fetching data

    try {
      const user = await AsyncStorage.getItem("user");
      const userData = JSON.parse(user);
      const userId = userData.user.id;

      const response = await axios.get(`${backend_url}/subs/${userId}`);
      console.log("Subscriptions response:", response.data);
      await setItemToAsyncStorage("subDetails", JSON.stringify(response.data));
      setSubscriptions(response.data);
      setMonthlyPrice(calculateMonthlyPrice(response.data));
    } catch (error) {
      console.error("Error fetching subscriptions:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Stop loading after the data is fetched or if an error occurs
    }
  };

  useEffect(() => {
    const checkAuthAndFetchSubscriptions = async () => {
      await checkAuthStatus(); // Ensure you handle this properly, depending on how it works in your project
      if (isSignedIn) {
        const result = await checkItemExists("subDetails");
        if (result) {
          // console.log('Item exists in AsyncStorage: ', result);
          setSubscriptions(result);
          setMonthlyPrice(calculateMonthlyPrice(result));
          setLoading(false); // Stop loading after the data is fetched or if an error occurs
        } else {
          fetchSubscriptions();
        }
      }
    };

    checkAuthAndFetchSubscriptions();
  }, [isSignedIn]);

  const onRefresh = async () => {
    const result = await checkItemExists("subDetails");
    if (result) {
      // console.log('Item exists in AsyncStorage: ', result);
      setSubscriptions(result);
      setMonthlyPrice(calculateMonthlyPrice(result));
      setLoading(false); // Stop loading after the data is fetched or if an error occurs
    } else {
      fetchSubscriptions();
    }
  };

  const handleLogout = async () => {
    setLoadingLogout(true); // Start loading indicator

    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("user");
      setIsSignedIn(false);
      console.log("User logged out successfully");
      router.replace("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoadingLogout(false); // Stop loading indicator
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {loadingLogout ? ( // Show ActivityIndicator during logout
        <View className="flex-1 justify-center items-center h-full">
          <ActivityIndicator size="xl" color="#F4CE14" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="w-full justify-center h-full px-4 my-6">
            <View className="flex-1 flex-row justify-between items-center mt-5">
              <TouchableOpacity
              className="w-[60px] h-[40px] rounded-full justify-center items-center"
                // className="w-[40px] h-[40px] rounded-full justify-center items-center"
                onPress={handleLogout}
              >
                <Text className="text-primary text-3xl">
                  <SimpleLineIcons name="logout" size={25} color="red" />
                </Text>
              </TouchableOpacity>
              <View className="flex-1 justify-center items-center">
                <Image
                  source={images.logo}
                  resizeMode="contain"
                  className="w-[150px] h-[35px]"
                />
              </View>
              <TouchableOpacity
                className="w-[60px] h-[40px] border-2 border-secondary rounded-full justify-center items-center"
                onPress={() => router.push("/main/add")}
              >
                <Text className="text-secondary text-3xl">+</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-xl text-white font-pbold text-center">
              Hello{" "}
              <Text className="text-secondary font-pextrabold">{userName}</Text>!
            </Text>
            <Text className="text-lg text-white text-regular mt-5 font-pmedium">
              Monthly Spending
            </Text>
            <Text className="text-5xl text-secondary mt-1 mb-1 font-pextrabold pt-1">
              ₹{monthlyPrice.toFixed(2)}
            </Text>
            {/* <Text className="text-md text-white text-regular font-pmedium mb-2">Updated on XX/XX/XXXX</Text> */}
            {loading ? (
              <View className="mt-40">
                <ActivityIndicator size="xl" color="#F4CE14" className="flex-1 justify-center align-middle" />
              </View>
            ) : (
              subscriptions.map((subscription) => (
                <CustomCard
                  key={subscription.ID}
                  subscriptionID={subscription.ID}
                  platform={subscription.name}
                  date={new Date(subscription.start_date).toLocaleDateString(
                    "en-GB"
                  )}
                  price={`₹${subscription.price}`}
                />
              ))
            )}
            <View className="mb-10"></View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;