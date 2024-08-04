import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomCard = ({ platform, date, price, onPress }) => {
return (
    <TouchableOpacity className="min-h-[60px] bg-[#252538] rounded-lg shadow-md p-4 mt-3">
        <View className="flex flex-col">
        <Text>Image</Text>
        <View className="flex-row justify-between items-start">
        <Text className="text-lg text-white font-psemibold">{platform}</Text>
        <Text className="text-xl text-white font-pbold">{price}</Text>
        </View>
        <Text className="text-sm text-gray-500 font-pregular mt-2">{date}</Text>
        </View>
    </TouchableOpacity>
    );
};

export default CustomCard