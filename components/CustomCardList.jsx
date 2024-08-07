import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { images } from "../constants"

const CustomCardList = ({ platform}) => {
return (
    <TouchableOpacity className="bg-[#161622] rounded-lg shadow-md p-4 pl-1 mt-2">
      <View className="flex-row items-center h-[40px]">
        <Image source={images.primevideo} className="w-[60px] h-[60px] mr-2" />
        
        <View className="flex-1">
            <Text className="text-xl text-white font-psemibold">{platform}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
};

export default CustomCardList