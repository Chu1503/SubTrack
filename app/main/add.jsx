import { SafeAreaView, ScrollView, Image, View, Text } from 'react-native'
import React from 'react'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import { useState } from "react";
import CustomCard from '../../components/CustomCard';
import { Redirect, router } from "expo-router";

const Add = () => {
  return (
    <SafeAreaView className="bg-[#a22222] h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[115px] h-[35px] mt-7"/>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Add;
