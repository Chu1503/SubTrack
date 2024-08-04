import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, View, Text, RefreshControl } from 'react-native';
import axios from 'axios';
import { images } from "../../constants";
import CustomCard from '../../components/CustomCard';
import { Redirect, router } from "expo-router";
import { TouchableOpacity } from "react-native";


const Home = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://68.233.114.188:5000/sub/991830116710023169');
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSubscriptions().finally(() => setRefreshing(false));
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
            <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
    
              <TouchableOpacity
                className="w-[40px] h-[40px] bg-secondary rounded-full justify-center items-center"
                onPress={() => router.push('/add')}
              >
                <Text className="text-primary text-3xl">+</Text>
              </TouchableOpacity>
            </View>
          
          <Text className="text-lg text-white text-regular mt-10 font-pmedium">Monthy</Text>
          <Text className="text-5xl text-secondary mt-2 font-pbold pt-3">₹69.69</Text>
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
