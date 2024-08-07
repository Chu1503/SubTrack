import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, Dimensions, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import CustomCardList from './CustomCardList';
import { images } from '../constants';

const { height, width } = Dimensions.get('window');

const CustomModal = ({ visible, onClose }) => {
  const [translateY, setTranslateY] = useState(0);
  const [activeTab, setActiveTab] = useState('List');
  const panRef = useRef(null);
  const underlinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = activeTab === 'List' ? 0 : 1;
    Animated.timing(underlinePosition, {
      toValue: width / 2 * index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

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
            <View className="h-full bg-[#1e1e2d] rounded-t-[30px] w-full">
              <View className="relative p-1">
                <View className="flex-row justify-between mb-2">
                  <TouchableOpacity
                    className="flex-1 p-2"
                    onPress={() => setActiveTab('List')}
                  >
                    <Text className={`text-center text-white text-lg font-psemibold`}>
                      List
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 p-2"
                    onPress={() => setActiveTab('Custom')}
                  >
                    <Text className="text-center text-white text-lg font-psemibold">
                      Custom
                    </Text>
                  </TouchableOpacity>
                </View>
                <Animated.View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 2,
                    width: width / 2,
                    backgroundColor: '#FF9C01',
                    transform: [{ translateX: underlinePosition }],
                  }}
                />
              </View>
              {activeTab === 'List' ? (
                <ScrollView className="p-3">
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