// // CustomModal.jsx
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withSpringTransition } from 'react-native-reanimated';

// const { height: screenHeight } = Dimensions.get('window');

// const CustomModal = ({ visible, onClose }) => {
//   const translateY = useSharedValue(screenHeight);

//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateY.value }],
//     };
//   });

//   React.useEffect(() => {
//     translateY.value = withSpring(visible ? 0 : screenHeight, {
//       damping: 5,
//       stiffness: 100,
//       overshootClamping: true,
//     });
//   }, [visible]);

//   const handleGestureEvent = Animated.event(
//     [{ nativeEvent: { translationY: translateY.value } }],
//     { useNativeDriver: true }
//   );

//   const handleStateChange = ({ nativeEvent }) => {
//     if (nativeEvent.oldState === State.ACTIVE && nativeEvent.translationY > 100) {
//       onClose();
//     }
//   };

//   return (
//     <Modal transparent visible={visible} animationType="none">
//       <TouchableOpacity style={styles.overlay} onPress={onClose}>
//         <PanGestureHandler
//           onGestureEvent={handleGestureEvent}
//           onHandlerStateChange={handleStateChange}
//         >
//           <Animated.View style={[styles.modal, animatedStyles]}>
//             <View style={styles.header}>
//               <Text style={styles.title}>Select a Service</Text>
//               <TouchableOpacity onPress={onClose}>
//                 <Text style={styles.close}>X</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.content}>
//               <Text>Select a service from the list below.</Text>
//               {/* Add your list or content here */}
//             </View>
//           </Animated.View>
//         </PanGestureHandler>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   modal: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     height: 300, // Adjust the height as needed
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   close: {
//     fontSize: 18,
//     color: 'red',
//   },
//   content: {
//     marginTop: 20,
//   },
// });

// export default CustomModal;