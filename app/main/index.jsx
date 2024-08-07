import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { images } from "../../constants";
import CustomCard from '../../components/CustomCard';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const calculateMonthlyPrice = (subscriptions) => {
  return subscriptions.reduce((total, subscription) => {
    let monthlyPrice = 0;

    switch (subscription.frequency) {
      case 'monthly':
        monthlyPrice = subscription.price;
        break;
      case 'annually':
        monthlyPrice = subscription.price / 12;
        break;
      default:
        if (subscription.frequency.startsWith('custom:')) {
          const customFrequency = subscription.frequency.split(':')[1];
          const unit = customFrequency.slice(-1);
          const amount = parseInt(customFrequency.slice(0, -1), 10);

          if (unit === 'd' && amount) {
            monthlyPrice = (subscription.price / amount) * 30;
          } else if (unit === 'm' && amount) {
            monthlyPrice = subscription.price / amount;
          } else if (unit === 'y' && amount) {
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
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const checkAuthStatus = async () => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      setIsSignedIn(false);
      router.replace('welcome');
    } else{
      const userData = JSON.parse(user); // Parse the stored user data
      // Access the email property from userData (assuming it's stored there)
      const userName = userData.user.givenName;
      setuserName(userName);
      console.log(userName);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://68.233.114.188:5000/sub/991830116710023169');
      setSubscriptions(response.data);
      setMonthlyPrice(calculateMonthlyPrice(response.data));
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus().then(() => {
      if (isSignedIn) {
        fetchSubscriptions();
      }
    });
  }, [isSignedIn]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSubscriptions().finally(() => setRefreshing(false));
  };

  const handleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('user');
      setIsSignedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="flex-row justify-between items-center mt-7">
            
            <TouchableOpacity
              className="w-[40px] h-[40px] rounded-full justify-center items-center"
              onPress={handleLogout}
            >
              <Text className="text-primary text-3xl">
              <SimpleLineIcons name="logout" size={24} color="red" />
              </Text>
            </TouchableOpacity>
            <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
            <TouchableOpacity
              className="w-[60px] h-[40px] border-2 border-secondary rounded-full justify-center items-center"
              onPress={() => router.push('/main/add')}
            >
              <Text className="text-secondary text-3xl">+</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg text-white text-regular mt-7 font-pbold text-center">Hello <Text className="text-secondary">{userName}</Text>!</Text>
          <Text className="text-lg text-white text-regular mt-5 font-pmedium">Monthly</Text>
          <Text className="text-5xl text-secondary mt-2 font-pbold pt-3">₹{monthlyPrice.toFixed(2)}</Text>
          <Text className="text-md text-white text-regular font-pmedium mb-2">Updated on XX/XX/XXXX</Text>
          {subscriptions.map(subscription => (
            <CustomCard
              key={subscription.ID}
              platform={subscription.name}
              date={new Date(subscription.start_date).toLocaleDateString()}
              price={`₹${subscription.price}`}
            />
          ))}
          <View className="mb-10"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
