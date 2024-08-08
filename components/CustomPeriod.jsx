import React from 'react';
import { View, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CustomPeriod = ({ value, onValueChange, unit, onUnitChange }) => {
  const defaultUnit = unit || 'Day(s)';

  const unitOptions = [
    { label: 'Day(s)', value: 'Day(s)' },
    { label: 'Month(s)', value: 'Month(s)' },
    { label: 'Year(s)', value: 'Year(s)' },
  ];

  return (
    <View className="mt-3 items-center">
      <View className="flex-row items-center">
        <Text className="text-white text-center text-base mr-2 font-pmedium">Every</Text>
        <TextInput
          className="w-20 p-2 bg-black-100 rounded-md text-white text-center mr-2"
          value={value}
          onChangeText={onValueChange}
          keyboardType="numeric"
        />
        <View className="w-44 h-12 bg-black-100 rounded-lg border-2 border-gray justify-center">
          <RNPickerSelect
            onValueChange={onUnitChange}
            value={defaultUnit}
            items={unitOptions}
            style={{
              inputIOS: {
                color: 'white',
                padding: 10,
              },
              inputAndroid: {
                color: 'white',
                padding: 10,
              },
              viewContainer: {
                borderRadius: 4,
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomPeriod;