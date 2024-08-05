import { Redirect, Stack, router } from "expo-router";

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

    </>
  )
}

export default TabsLayout;