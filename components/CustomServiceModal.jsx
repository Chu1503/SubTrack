import React, { useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, PanResponder, Animated } from 'react-native';
import FormField from './FormField';

const CustomServiceModal = ({ visible, onClose, onSubmit, serviceName, setServiceName }) => {
  const [modalHeight, setModalHeight] = useState(0);
  const [startY, setStartY] = useState(0);
  const panY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        setStartY(event.nativeEvent.pageY);
      },
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        const endY = event.nativeEvent.pageY;
        const swipeDistance = gestureState.dy;
        const isInsideModal = endY >= startY && endY <= startY + modalHeight;

        if (swipeDistance > 50 && isInsideModal) {
          onClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setModalHeight(height);
  };

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end items-center">
          <TouchableWithoutFeedback>
            <Animated.View
              {...panResponder.panHandlers}
              className="bg-primary rounded-2xl p-4 pt-2 w-full"
              onLayout={handleLayout}
              style={{ transform: [{ translateY: panY }] }}
              onStartShouldSetResponder={() => true}
            >
              {/* <Image source={images.dash} resizeMode='contain' className="h-[35px] self-center mb-4" /> */}
              <Text className="text-white text-3xl mt-4 mb-4">Create a custom service</Text>
              <FormField
                title="What's your service?"
                value={serviceName}
                placeholder="Service Name"
                handleChangeText={setServiceName}
                otherStyles="mb-5"
              />
              <View className="flex-row justify-between">
                <TouchableOpacity onPress={() => { onSubmit(); onClose(); }} className="bg-secondary p-2 rounded-full w-[90vw] mb-7">
                  <Text className="text-primary text-center text-base">Create Service</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomServiceModal;