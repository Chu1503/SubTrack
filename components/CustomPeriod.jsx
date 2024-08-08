import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const CustomPeriod = ({ value, onValueChange, unit, onUnitChange, dropdownVisible, onDropdownToggle, onDropdownSelect }) => {
  const currentUnit = `${unit}(s)`;

  return (
    <View className="mt-3 items-center">
      <View className="flex-row items-center">
        <Text className="text-white text-center text-base mr-2 font-pmedium">Every</Text>
        <TextInput
          className="w-20 p-2 bg-gray-800 rounded-md text-white text-center"
          value={value}
          onChangeText={onValueChange}
          keyboardType="numeric"
        />
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            className="w-24 p-2 bg-gray-800 rounded-md border border-gray-600 justify-center"
            onPress={onDropdownToggle}
          >
            <Text className="text-white text-base">{currentUnit}</Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View
              className="bg-gray-800 rounded-md border border-gray-600 w-24 mt-1"
              style={{ position: 'absolute', top: '100%', zIndex: 1 }}
            >
              {['Day', 'Month', 'Year'].map((unit) => (
                <TouchableOpacity
                  key={unit}
                  className="p-2 border-b border-gray-600 justify-center"
                  onPress={() => onDropdownSelect(unit)}
                >
                  <Text className="text-white text-base">{`${unit}(s)`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomPeriod;