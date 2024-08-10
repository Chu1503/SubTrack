import React from 'react';
import { View, Text, Image, Animated, TouchableOpacity, Alert } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';

const SWIPE_THRESHOLD = 200; // Adjust this value based on how much swipe distance is needed

const CustomServiceList = ({ platform, image, onPress, onDelete }) => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const backgroundColor = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: ['red', 'transparent'], // Red when swiped left, transparent when at rest
  });

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const swipeDistance = nativeEvent.translationX;
      const shouldDelete = swipeDistance < -SWIPE_THRESHOLD;
      
      if (shouldDelete) {
        // Show confirmation alert
        Alert.alert(
          'Delete Service',
          'Are you sure you want to delete this service?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                // Reset to original position
                Animated.timing(translateX, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              },
            },
            {
              text: 'Delete',
              onPress: () => {
                // Fully swipe out of view
                Animated.timing(translateX, {
                  toValue: -1000, // Slide out of view
                  duration: 300,
                  useNativeDriver: true,
                }).start(() => {
                  if (onDelete) onDelete(); // Trigger the delete callback after animation
                });
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        // Return to original position
        Animated.timing(translateX, {
          toValue: 0,
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
          flex: 1,
          flexDirection: 'row',
          transform: [{ translateX }],
        }}
      >
        <Animated.View/>
        <TouchableOpacity
          onPress={onPress}
          className="bg-primary rounded-3xl shadow-md p-4 pl-1 mt-2 w-full border-2 border-gray"
        >
          <View className="flex-row items-center h-[50px]">
            <Image source={image} className="w-[60px] h-[60px] mr-2" />
            <View className="flex-1">
              <Text className="text-lg text-white font-psemibold">{platform}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Animated.View className="bg-[#FF0000] rounded-3xl shadow-md p-4 pl-1 mt-2 w-full border-2 border-gray">
          <View className="flex items-start justify-center mt-2 ml-5">
            <AntDesign name="delete" size={30} color="white" />
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CustomServiceList;