import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import FormField from '../../components/FormField';
import CustomModal from '../../components/CustomModal';

const Add = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="flex-row items-center mt-7">
            <TouchableOpacity
              className="w-[40px] h-[40px] rounded-full justify-center items-center mr-2"
              onPress={() => router.push('/home')}
            >
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-pbold">New Subscription</Text>
          </View>
          
          <View className="mt-10">
            <FormField
              title="Service"
              placeholder="Select a service"
              onPress={handleOpenModal}
              otherStyles="my-4"
              innerText={
                <Ionicons name="list" size={24} color="white" />
              }
            />
          </View>

          <CustomModal visible={modalVisible} onClose={handleCloseModal} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Add;