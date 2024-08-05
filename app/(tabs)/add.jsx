import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";
import CustomField from '../../components/CustomField'; // Adjust the import path as needed
import CustomModal from '../../components/CustomModal';
import CustomDatePicker from '../../components/CustomDatePicker';

const Add = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [customPeriodVisible, setCustomPeriodVisible] = useState(false);
  const [customPeriodValue, setCustomPeriodValue] = useState('1');
  const [customPeriodUnit, setCustomPeriodUnit] = useState('Day');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setCustomPeriodVisible(period === 'Custom');
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (unit) => {
    setCustomPeriodUnit(unit);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="flex-row items-center mt-7">
            <TouchableOpacity
              className="w-10 h-10 rounded-full justify-center items-center mr-2"
              onPress={() => router.push('/home')}
            >
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">New Subscription</Text>
          </View>

          <View className="mt-1">
            <CustomField
              title="Service"
              placeholder="Select a service"
              onPress={handleOpenModal}
              otherStyles="my-2"
              innerText={<Entypo name="list" size={24} color="#FF9C01" />}
              editable={false} // Disable typing
            />
            <CustomField
              title="Billing Date"
              placeholder={selectedDate ? selectedDate.toDateString() : "Select a payday"}
              onPress={handleOpenDatePicker}
              otherStyles="my-2"
              innerText={<Entypo name="calendar" size={24} color="#FF9C01" />}
              editable={false} // Disable typing
            />
            <CustomField
              title="Price"
              placeholder="0.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              prefix="₹"
              otherStyles="my-2"
            />
            <Text className="text-base text-gray-100 font-medium my-2">Period</Text>

            <View className="flex-row flex-wrap justify-between mt-2">
              {['Monthly', 'Semi-Annually', 'Annually', 'Custom'].map((period) => (
                <TouchableOpacity
                  key={period}
                  className={`flex-1 p-3 rounded-md mx-1 mb-2 ${
                    selectedPeriod === period ? 'bg-secondary' : 'bg-gray-800'
                  }`}
                  style={{ minWidth: 120 }}
                  onPress={() => handlePeriodSelect(period)}
                >
                  <Text className={`text-center text-white font-semibold`}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {customPeriodVisible && (
              <View className="mt-2 items-center">
                <View className="flex-row items-center">
                  <Text className="text-white text-base">Every</Text>
                  <TextInput
                    className="w-20 p-2 bg-gray-800 rounded-md text-white text-center"
                    value={customPeriodValue}
                    onChangeText={setCustomPeriodValue}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    className="w-36 ml-2 p-2 bg-gray-800 rounded-md border border-gray-600 items-center"
                    onPress={handleDropdownToggle}
                  >
                    <Text className="text-white text-base">{customPeriodUnit}</Text>
                  </TouchableOpacity>
                </View>

                {dropdownVisible && (
                  <View className="top-2 bg-gray-800 rounded-md border border-gray-600 w-36">
                    {['Day', 'Month', 'Year'].map((unit) => (
                      <TouchableOpacity
                        key={unit}
                        className="p-2 border-b border-gray-600"
                        onPress={() => handleDropdownSelect(unit)}
                      >
                        <Text className="text-white text-base">{unit}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>

          <CustomModal visible={modalVisible} onClose={handleCloseModal} />
          <CustomDatePicker
            visible={datePickerVisible}
            value={selectedDate || new Date()}
            onDateChange={handleDateChange}
            onClose={() => setDatePickerVisible(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;