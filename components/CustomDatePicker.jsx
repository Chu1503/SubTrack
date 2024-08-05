import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ visible, value, onDateChange, onClose }) => {
  const [date, setDate] = useState(value);
  const [show, setShow] = useState(visible);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const handleOkPress = () => {
    onClose(); // Close the modal when OK is pressed
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={show}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-11/12 bg-[#161622] rounded-xl p-4">
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
            themeVariant="dark"
          />
          <View className="flex-row mt-4 justify-between">
            <TouchableOpacity
              className="flex-1 p-3 border border-[#FF9C01] rounded-md mx-2 items-center"
              onPress={onClose}
            >
              <Text className="text-[#FF9C01]">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 p-3 bg-[#FF9C01] rounded-md mx-2 items-center"
              onPress={handleOkPress}
            >
              <Text className="text-white">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDatePicker;