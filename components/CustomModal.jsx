import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const CustomModal = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          {/* Content */}
          <TouchableOpacity 
            className="bg-secondary p-2 rounded-xl justify-center items-center"
            onPress={onClose}
          >
            <Text className="text-white text-lg">Close</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;