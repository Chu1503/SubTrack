import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { images } from "../constants";

const CustomCard = ({ platform, date, price }) => {
  // Helper function to determine image source based on platform
  const getImageSource = (platform) => {
    switch (platform.toLowerCase()) {
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

  return (
    <TouchableOpacity className="min-h-[60px] bg-black-100 rounded-3xl shadow-md p-4 mt-3 border-2 border-gray">
      <View className="flex-row items-center">
        <Image source={getImageSource(platform)} className="w-[50px] h-[50px] mr-4" />
        
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg text-white font-psemibold">{platform}</Text>
              <Text className="text-sm text-gray-500 font-pregular">{date}</Text>
            </View>
            
            <Text className="text-2xl text-white font-pbold">{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;
