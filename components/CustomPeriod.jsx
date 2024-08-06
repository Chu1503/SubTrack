import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const pluralizeUnit = (unit, value) => {
  if (value === '1') {
    return unit;
  }
  switch (unit) {
    case 'Day':
      return 'Days';
    case 'Month':
      return 'Months';
    case 'Year':
      return 'Years';
    default:
      return unit;
  }
};

const CustomPeriod = ({ value, onValueChange, unit, onUnitChange, dropdownVisible, onDropdownToggle, onDropdownSelect }) => {
  const currentUnit = pluralizeUnit(unit, value);

  return (
    <View className="mt-2 items-center">
      <View className="flex-row items-center">
        <Text className="text-white text-base">Every</Text>
        <TextInput
          className="w-20 p-2 bg-gray-800 rounded-md text-white text-center"
          value={value}
          onChangeText={onValueChange}
          keyboardType="numeric"
        />
        <TouchableOpacity
          className="w-24 ml-2 p-2 bg-gray-800 rounded-md border border-gray-600 justify-center"
          onPress={onDropdownToggle}
        >
          <Text className="text-white text-base">{currentUnit}</Text>
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <View className="mt-1 bg-gray-800 rounded-md border border-gray-600 w-24">
          {['Day', 'Month', 'Year'].map((unit) => (
            <TouchableOpacity
              key={unit}
              className="p-2 border-b border-gray-600 justify-center"
              onPress={() => onDropdownSelect(unit)}
            >
              <Text className="text-white text-base">{pluralizeUnit(unit, value)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomPeriod;