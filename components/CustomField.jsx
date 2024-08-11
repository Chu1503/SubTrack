import React, { useRef } from 'react';
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
  const inputRef = useRef(null); // Create a reference to the TextInput

  const handlePress = () => {
    if (onPress) {
      onPress(); // If there's an onPress handler, call it
    }
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the TextInput when the TouchableOpacity is pressed
    }
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-regular text-base text-gray-100 font-medium">{title}</Text>
      <TouchableOpacity
        className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-gray flex flex-row items-center"
        onPress={handlePress} // Use handlePress instead of onPress
        activeOpacity={1} // Ensure the touchable area behaves properly
      >
        {prefix && <Text className="text-white font-semibold text-base mr-2">{prefix}</Text>}
        <TextInput
          ref={inputRef} // Attach the reference to the TextInput
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