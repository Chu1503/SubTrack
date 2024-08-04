import { SafeAreaView, ScrollView, Image, View, Text } from 'react-native'
import React from 'react'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import { useState } from "react";
import CustomButton from '../../components/CustomButton';
import { Redirect, router } from "expo-router";

const OTP = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[115px] h-[35px]  mt-7"/>

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Enter the 6 digit verification code sent to +91 ******2286</Text>

          <FormField
          keyboardType="phone-pad"
          />

          <Text className="text-xl text-secondary mt-5 text-semibold font-pregular">Resend Code</Text>

          <CustomButton 
          title="Confirm"
          handlePress={() => router.push('/home')}
          containerStyles="mt-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OTP;