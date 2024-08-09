import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import CustomField from "../../components/CustomField";
import CustomModal from "../../components/CustomModal";
import CustomPeriod from "../../components/CustomPeriod";
import colors from "../../constants/colors";
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Add = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date()); // Track temporary date
  const [price, setPrice] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [customPeriodVisible, setCustomPeriodVisible] = useState(false);
  const [customPeriodValue, setCustomPeriodValue] = useState("1");
  const [customPeriodUnit, setCustomPeriodUnit] = useState("Day");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [serviceName, setServiceName] = useState('');

  const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenDatePicker = () => {
    setTempDate(selectedDate); // Save the current date as temporary
    setDatePickerVisible(true);
  };

  const handleDateChange = (date) => {
    const [year, month, day] = date.split('/'); // Split the date string
    const formattedDate = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD format
    const parsedDate = new Date(formattedDate);
    if (!isNaN(parsedDate.getTime())) {
      setTempDate(parsedDate); // Update temporary date
    } else {
      console.warn("Invalid Date:", date);
    }
  };

  const handleConfirmDate = () => {
    setSelectedDate(tempDate); // Confirm the new date
    setDatePickerVisible(false); // Close the picker
  };

  const handleCancelDate = () => {
    setTempDate(selectedDate); // Revert to the original date
    setDatePickerVisible(false); // Close the picker
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setCustomPeriodVisible(period === "Custom");
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (unit) => {
    setCustomPeriodUnit(unit);
    setDropdownVisible(false);
  };

  const handleSelectService = (selectedService) => {
    setServiceName(selectedService); // Update the service name
  };

  const validateFields = () => {
    if (!serviceName.trim()) {
      Alert.alert("Error Adding Subsciption", "Choose a service");
      return false;
    }
    if (!price.trim() || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert("Error Adding Subsciption", "Enter an amount");
      return false;
    }
    if (!selectedDate) {
      Alert.alert("Error Adding Subsciption", "Select a valid date");
      return false;
    }
    if (!selectedPeriod) {
      Alert.alert("Error Adding Subsciption", "Select a period");
      return false;
    }
    if (selectedPeriod === 'Custom' && (isNaN(parseInt(customPeriodValue)) || parseInt(customPeriodValue) <= 0)) {
      Alert.alert("Error Adding Subsciption", "Custom period value must be a positive number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const user = await AsyncStorage.getItem('user');
    const userData = JSON.parse(user);
    const userId = userData.user.id
    if (validateFields()) {
      const data = {
        user_id: userId, // Ensure this is set appropriately
        name: serviceName,
        price: parseFloat(price),
        start_date: selectedDate.toISOString(), // Convert date to ISO 8601 format
        status: 'active', // Initial status
        frequency: selectedPeriod === 'Custom'
          ? `custom:${customPeriodValue}${customPeriodUnit.charAt(0).toLowerCase()}`
          : selectedPeriod.toLowerCase(), // Format frequency as needed
      };
      
      // Perform the API request or other actions
      console.log("Subscription data:", data);
      try{
        const response = await axios.post(`${backend_url}/sub`, data);
        console.log('Sub creation response:', response.data);
      }catch(err){
        console.error(err);
      }
      router.replace("/main")
    }
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="flex-row items-center mt-7">
            <Pressable
              className="w-10 h-10 rounded-full justify-center items-center mr-2"
              onPress={() => router.push("/main")}
            >
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </Pressable>
            <Text className="text-white text-2xl font-bold">
              New Subscription
            </Text>
          </View>

          <View className="mt-1">
            <CustomField
              title="Service"
              placeholder={serviceName || "Select a service"}
              onPress={handleOpenModal}
              otherStyles="my-2"
              innerText={
                <Entypo
                  name="list"
                  size={24}
                  color={colors.secondary.DEFAULT}
                />
              }
              editable={false}
            />
            <CustomField
              title="Billing Date"
              placeholder={selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate.toDateString() : "Select a payday"}
              onPress={handleOpenDatePicker}
              otherStyles="my-2"
              innerText={
                <Entypo
                  name="calendar"
                  size={24}
                  color={colors.secondary.DEFAULT}
                />
              }
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
            <Text className="text-base text-gray-100 font-medium my-2">
              Period
            </Text>

            <View className="flex-row flex-wrap justify-between mt-2">
              {["Monthly", "Semi-Annually", "Annually", "Custom"].map(
                (period) => (
                  <Pressable
                    key={period}
                    className={`flex-1 p-3 rounded-lg mx-1 mb-2 border-2 border-gray ${selectedPeriod === period
                      ? "bg-secondary"
                      : "bg-black-100"
                      }`}
                    style={{ minWidth: 120 }}
                    onPress={() => handlePeriodSelect(period)}
                  >
                    <Text
                      className={`text-center font-semibold ${selectedPeriod === period
                        ? "text-primary"
                        : "text-white"
                        }`}
                    >
                      {period}
                    </Text>
                  </Pressable>
                )
              )}
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

          {modalVisible && (
            <CustomModal visible={modalVisible} onClose={handleCloseModal} onSelectService={handleSelectService} /> // Pass the callback
          )}

          {datePickerVisible && (
            <Modal
              transparent
              visible={datePickerVisible}
              animationType="fade"
              onRequestClose={handleCancelDate}
            >
              <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-black border border-gray rounded-xl p-4 w-[90%]">
                  <DatePicker
                    options={{
                      backgroundColor: "#202021",
                      textHeaderColor: "#F4CE14",
                      textDefaultColor: "white",
                      selectedTextColor: "black",
                      mainColor: "#F4CE14",
                      textSecondaryColor: "white",
                    }}
                    current={selectedDate.toISOString().split('T')[0]}
                    selected={tempDate.toISOString().split('T')[0]}
                    mode="calendar"
                    minuteInterval={30}
                    style={{ borderRadius: 10 }}
                    onDateChange={handleDateChange}
                  />
                  <View className="flex-row justify-between mt-4">
                    <Pressable
                      className="ml-4 mt-3 mb-3"
                      onPress={handleCancelDate}
                    >
                      <Text className="text-white text-center font-semibold text-md">Cancel</Text>
                    </Pressable>
                    <Pressable
                      className="mr-4 mt-3 mb-3"
                      onPress={handleConfirmDate}
                    >
                      <Text className="text-white text-center font-semibold text-md">Ok</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          <View className="flex-row justify-between">
            <TouchableOpacity onPress={handleSubmit} className="bg-secondary p-2 rounded-full w-[90vw] mt-5">
              <Text className="text-primary text-center text-base">Add Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;