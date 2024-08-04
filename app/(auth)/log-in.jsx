import { SafeAreaView, ScrollView, Image, View, Text } from 'react-native';
import React from 'react';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Redirect, router } from "expo-router";

const LogIn = () => {

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[115px] h-[35px] mt-7"/>

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to my ass</Text>

          <FormField
          title="Phone Number"
          otherStyles="mt-7"
          keyboardType="phone-pad"
          />

          <CustomButton 
          title="Send OTP"
          handlePress={() => router.push('/otp-screen')}
          containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LogIn;