import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomField = ({ title, placeholder, innerText, onPress, otherStyles }) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title && <Text className="text-base text-gray-100 font-pmedium">{title}</Text>}
      
      <TouchableOpacity 
        className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex flex-row items-center justify-between"
        onPress={onPress}
        activeOpacity={1}
      >
        <Text className="text-white font-psemibold text-base">
          {placeholder}
        </Text>
        
        {innerText && (
          <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <View className="ml-2">
              {innerText}
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomField;