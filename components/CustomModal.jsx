import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, Dimensions, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import CustomCardList from './CustomCardList';
import CustomServiceModal from './CustomServiceModal';
import { images } from '../constants';
import colors from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const { height, width } = Dimensions.get('window');

const CustomModal = ({ visible, onClose, onSelectService }) => {
  const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL
  const [translateY, setTranslateY] = useState(0);
  const [activeTab, setActiveTab] = useState('List');
  const [formVisible, setFormVisible] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [customPlatforms, setCustomPlatforms] = useState([]);
  const panRef = useRef(null);
  const underlinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Function to fetch custom services from the backend
    const fetchCustomPlatforms = async () => {
      const user = await AsyncStorage.getItem('user');
      const userData = JSON.parse(user);
      const userId = userData.user.id
      try {
        const response = await axios.get(`${backend_url}/service/${userId}`);
        const data = response.data.services;
        setCustomPlatforms(data || []);
      } catch (error) {
        console.error('Failed to fetch custom platforms:', error);
      }
    };

    fetchCustomPlatforms();
  }, []);

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

  const handleOpenForm = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setServiceName('');
  };

  const handleSubmitForm = () => {
    if (serviceName) {
      // Update state and handle the API call within the state update callback
      setCustomPlatforms(prev => {
        const updatedPlatforms = [...prev, serviceName];
  
        // Function to update custom platforms on the backend
        const updateCustomPlatforms = async () => {
          const user = await AsyncStorage.getItem('user');
          const userData = JSON.parse(user);
          const userId = userData.user.id;
  
          const post_data = {
            "user_id": userId,
            "custom": {"services": updatedPlatforms}
          };
  
          try {
            const response = await axios.post(`${backend_url}/service`, post_data);
            console.log('Response from server:', response.data);
          } catch (error) {
            console.error('Failed to update custom platforms:', error);
          }
        };
  
        // Call the function to update the backend
        updateCustomPlatforms();
  
        // Reset serviceName and close the form
        setServiceName('');
        handleCloseForm();
  
        // Return the updated platforms to set the new state
        return updatedPlatforms;
      });
    }
  };
  
  const handleSelectService = (serviceName) => {
    console.log(serviceName)
    onSelectService(serviceName); // Call the callback with the selected service
    onClose(); // Close the modal
  };

  const platforms = [
    { name: 'Prime Video', image: images.primevideo },
    { name: 'Netflix', image: images.netflix },
    { name: 'Hotstar', image: images.primevideo },
    { name: 'Sony LIV', image: images.primevideo },
  ];

  return (
    <>
      <Modal transparent visible={visible} animationType="slide">
        <GestureHandlerRootView className="flex-1">
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={handleGesture}
            onEnded={handleGestureEnd}
          >
            <View className="flex-1 justify-end" style={{ transform: [{ translateY }] }}>
              <View className="h-full bg-black-100 rounded-t-[30px] w-full">
                <Image source={images.dash} resizeMode='contain' className="h-[35px] self-center mt-2" />
                <View className="relative p-1">
                  <View className="flex-row justify-between mb-2">
                    <TouchableOpacity
                      className="flex-1 p-2"
                      onPress={() => setActiveTab('List')}
                    >
                      <Text className={`text-center text-white text-xl font-psemibold`}>
                        List
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 p-2"
                      onPress={() => setActiveTab('Custom')}
                    >
                      <Text className="text-center text-white text-xl font-psemibold">
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
                      backgroundColor: colors.secondary.DEFAULT,
                      transform: [{ translateX: underlinePosition }],
                    }}
                  />
                </View>
                {activeTab === 'List' ? (
                  <ScrollView className="p-3">
                    {platforms.map((platform, index) => (
                      <CustomCardList key={index} platform={platform.name} image={platform.image} onPress={() => handleSelectService(platform.name)} /> // Handle selection
                    ))}
                  </ScrollView>
                ) : (
                  <ScrollView className="p-3">
                    <View className="flex-1 items-center justify-start">
                      <TouchableOpacity onPress={handleOpenForm} className="bg-secondary p-3 rounded-full w-[90vw] mt-10 border-2 border-gray">
                        <Text className="text-primary text-center text-lg">Add Custom Service</Text>
                      </TouchableOpacity>
                    </View>
                    {customPlatforms.map((service, index) => (
                      <CustomCardList key={index} platform={service} image={images.google} onPress={() => handleSelectService(service)} />
                    ))}
                  </ScrollView>
                )}
              </View>
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Modal>

      <CustomServiceModal
        visible={formVisible}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        serviceName={serviceName}
        setServiceName={setServiceName}
      />
    </>
  );
};

export default CustomModal;