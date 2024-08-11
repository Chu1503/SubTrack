import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const CustomCardList = ({ platform, image, onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-primary rounded-3xl shadow-md p-4 pl-1 mt-2 w-full border-2 border-gray"
      onPress={onPress}
    >
      <View className="flex-row items-center h-[50px]">
        {image ? (
          <Image 
            source={image} 
            className="w-[60px] h-[60px] mr-2 ml-1 rounded-3xl" 
          />
        ) : (
          <View 
          className="w-[60px] h-[60px] bg-black-100 rounded-3xl justify-center items-center mr-2 ml-1 border-2 border-black"
        >
          <Text className="text-white text-2xl font-pregular">{platform.charAt(0)}</Text>
        </View>
        )}
        <View className="flex-1">
          <Text className="text-lg text-white font-psemibold">{platform}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCardList;