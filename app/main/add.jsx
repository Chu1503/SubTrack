import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";
import CustomField from '../../components/CustomField';
import CustomModal from '../../components/CustomModal';
import CustomPeriod from '../../components/CustomPeriod';

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
    console.log('Opening modal'); // Debug
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    console.log('Closing modal'); // Debug
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
              onPress={() => router.push('/main')}
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
              editable={false}
            />
            <CustomField
              title="Billing Date"
              placeholder={selectedDate ? selectedDate.toDateString() : "Select a payday"}
              onPress={handleOpenDatePicker}
              otherStyles="my-2"
              innerText={<Entypo name="calendar" size={24} color="#FF9C01" />}
              editable={false}
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
              <CustomPeriod
                value={customPeriodValue}
                onValueChange={setCustomPeriodValue}
                unit={customPeriodUnit}
                onUnitChange={setCustomPeriodUnit}
                dropdownVisible={dropdownVisible}
                onDropdownToggle={handleDropdownToggle}
                onDropdownSelect={handleDropdownSelect}
              />
            )}
          </View>

          {modalVisible && <CustomModal visible={modalVisible} onClose={handleCloseModal} />}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;