import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const CustomCardList = ({ platform, image }) => {
  return (
    <TouchableOpacity className="bg-primary rounded-3xl shadow-md p-4 pl-1 mt-2 w-full border-2 border-gray">
      <View className="flex-row items-center h-[50px]">
        <Image source={image} className="w-[60px] h-[60px] mr-2" />
        <View className="flex-1">
          <Text className="text-lg text-white font-psemibold">{platform}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCardList;