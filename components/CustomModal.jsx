import React, { useState, useRef } from 'react';
import { Modal, View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import CustomCardList from './CustomCardList';
import { images } from '../constants';

const { height } = Dimensions.get('window');

const CustomModal = ({ visible, onClose }) => {
  const [translateY, setTranslateY] = useState(0);
  const [activeTab, setActiveTab] = useState('List');
  const panRef = useRef(null);

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationY > 0) {
      setTranslateY(nativeEvent.translationY);
    }
  };

  const handleGestureEnd = ({ nativeEvent }) => {
    const shouldClose = nativeEvent.translationY > height * 0.3 || nativeEvent.velocityY > 1000;
    if (shouldClose) {
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  const platforms = [
    { name: 'Prime Video', image: images.primevideo },
    { name: 'Netflix', image: images.primevideo },
    { name: 'Hotstar', image: images.primevideo },
    { name: 'Sony LIV', image: images.primevideo },
  ];

  return (
    <Modal transparent visible={visible} animationType="slide">
      <GestureHandlerRootView className="flex-1">
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={handleGesture}
          onEnded={handleGestureEnd}
        >
          <View className="flex-1 justify-end" style={{ transform: [{ translateY }] }}>
            <View className="h-full bg-[#1e1e2d] rounded-t-[30px] p-4 w-full">
              <View className="flex-row justify-between border-b border-gray-600 mb-4">
                <TouchableOpacity
                  className={`flex-1 p-2 ${activeTab === 'List' ? 'bg-gray-800' : 'bg-gray-600'}`}
                  onPress={() => setActiveTab('List')}
                >
                  <Text className={`text-center text-white font-semibold ${activeTab === 'List' ? 'text-lg' : 'text-base'}`}>
                    List
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 p-2 ${activeTab === 'Custom' ? 'bg-gray-800' : 'bg-gray-600'}`}
                  onPress={() => setActiveTab('Custom')}
                >
                  <Text className={`text-center text-white font-semibold ${activeTab === 'Custom' ? 'text-lg' : 'text-base'}`}>
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>
              {activeTab === 'List' ? (
                <ScrollView>
                  {platforms.map((platform, index) => (
                    <CustomCardList key={index} platform={platform.name} image={platform.image} />
                  ))}
                </ScrollView>
              ) : (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-white text-xl">Wow Gestures!</Text>
                </View>
              )}
            </View>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default CustomModal;