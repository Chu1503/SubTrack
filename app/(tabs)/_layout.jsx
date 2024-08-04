import { Redirect, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from 'react-native'
import { TouchableOpacity } from "react-native";
import CustomButton from '../../components/CustomButton';

const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* <View className="absolute bottom-0 left-0 right-0 min-h-[60px] bg-primary flex items-center justify-center">
        <TouchableOpacity className="flex items-center justify-center">
          <Text className="text-white text-lg" onPress={() => router.push('/add')}>ADD</Text>
        </TouchableOpacity>
      </View> */}


      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabsLayout;