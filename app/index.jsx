import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from "../components/CustomButton";

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%'}}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <Image 
                    source={images.logo}
                    className="w-[130px] h-[84px]"
                    resizeMode="contain"
                    />
                    
                <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Oh My God {"\n"}
              <Text className="text-secondary-200">Wow</Text>
            </Text>
          </View>

          <CustomButton 
          title="Get Started"
          handlePress={() => router.push('/log-in')}
          containerStyles="w-full mt-7"

          />
                    
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style='light'/>
        </SafeAreaView>
    );
}