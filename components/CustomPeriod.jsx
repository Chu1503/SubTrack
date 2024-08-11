import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';

const CustomPeriod = ({ value, onValueChange, unit, onUnitChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("Day(s)");

  const unitOptions = [
    { label: 'Day(s)', value: 'Day(s)' },
    { label: 'Month(s)', value: 'Month(s)' },
    { label: 'Year(s)', value: 'Year(s)' },
  ];

  useEffect(() => {
    setSelectedUnit(unit);
  }, [unit]);

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    onUnitChange(unit);
    setDropdownVisible(false);
  };

  const handleCloseModal = () => {
    setDropdownVisible(false);
  };

  return (
    <View className="mt-4 items-center">
      <View className="flex-row items-center">
        <Text className="text-white text-base font-semibold mr-2">Every</Text>
        <TextInput
          className="w-16 h-12 p-2 bg-black-100 rounded text-white text-center mr-2 text-base border-2 border-gray"
          value={value}
          onChangeText={onValueChange}
          keyboardType="numeric"
        />
        <TouchableOpacity
          className="w-32 h-12 bg-black-100 rounded justify-center p-2 border-2 border-gray"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text className="text-white text-base text-center font-semibold">{selectedUnit}</Text>
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={dropdownVisible}
          onRequestClose={handleCloseModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View className="flex-1 bg-black/50" />
          </TouchableWithoutFeedback>
          <View className="absolute bottom-0 w-full bg-black-100 rounded-t-3xl">
            <View className="overflow-hidden">
              <FlatList
                data={unitOptions}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-4"
                    onPress={() => handleSelectUnit(item.value)}
                  >
                    <Text className="text-white text-base text-center">{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CustomPeriod;