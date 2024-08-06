import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ headerShown: false }} />
      {/* Add other screens as needed */}
    </Stack>
  );
}