import React from 'react';
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const SWIPE_THRESHOLD = 100;

const CustomServiceList = ({ platform, image, onPress, onDelete }) => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const shouldDelete = nativeEvent.translationX < -SWIPE_THRESHOLD;
      if (shouldDelete) {
        Animated.timing(translateX, {
          toValue: -1000, // Slide out of view
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (onDelete) onDelete(); // Trigger the delete callback after animation
        });
      } else {
        Animated.timing(translateX, {
          toValue: 0, // Return to original position
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          className="bg-primary rounded-3xl shadow-md p-4 pl-1 mt-2 w-full border-2 border-gray">
          <View className="flex-row items-center h-[50px]">
            <Image source={image} className="w-[60px] h-[60px] mr-2" />
            <View className="flex-1">
              <Text className="text-lg text-white font-psemibold">{platform}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CustomServiceList;
