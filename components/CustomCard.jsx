import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { images } from "../constants"

const CustomCard = ({ platform, date, price }) => {
return (
    <TouchableOpacity className="min-h-[60px] bg-[#252538] rounded-lg shadow-md p-4 mt-3">
      <View className="flex-row items-center">
        <Image source={images.primevideo} className="w-[50px] h-[50px] mr-4" />
        
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-md text-white font-psemibold">{platform}</Text>
              <Text className="text-xs text-gray-500 font-pregular mt-1">{date}</Text>
            </View>
            
            <Text className="text-xl text-white font-pbold">{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    );
};

export default CustomCard