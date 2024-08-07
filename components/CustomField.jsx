import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const CustomField = ({
  title,
  placeholder,
  onPress,
  otherStyles,
  innerText,
  prefix,
  keyboardType,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-medium">{title}</Text>
      <TouchableOpacity
        className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex flex-row items-center"
        onPress={onPress}
      >
        {prefix && <Text className="text-white font-semibold text-base mr-2">{prefix}</Text>}
        <TextInput
          className="flex-1 text-white font-semibold text-base"
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          keyboardType={keyboardType}
          {...props}
        />
        {innerText && <View className="ml-2">{innerText}</View>}
      </TouchableOpacity>
    </View>
  );
};

export default CustomField;