import { SafeAreaView, ScrollView, Image, View, Text } from 'react-native'
import React from 'react'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import { useState } from "react";
import CustomCard from '../../components/CustomCard';
import { Redirect, router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[115px] h-[35px] mt-7"/>
          
          <Text className="text-lg text-white text-regular mt-10 font-pmedium">Monthy</Text>
          <Text className="text-5xl text-secondary mt-2 font-pbold pt-3">₹69.69</Text>
          <Text className="text-md text-white text-regular font-pmedium mb-2">Updated on XX/XX/XXXX</Text>

          <CustomCard 
            platform="Amazon Prime Video" 
            date="04/04/2024" 
            price="₹1499"
          />

          <CustomCard 
            platform="Netflix" 
            date="05/05/2025" 
            price="₹1999"
          />

          <CustomCard 
            platform="Disney+ Hotstar" 
            date="06/06/2026" 
            price="₹999"
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;