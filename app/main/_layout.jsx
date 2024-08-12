import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation: "none" }} />
      <Stack.Screen name="add" options={{ headerShown: false , animation: "none"}} />
      <Stack.Screen name="view" options={{ headerShown: false , animation: "none"}} />
      <Stack.Screen name="edit" options={{ headerShown: false , animation: "none"}} />
      {/* Add other screens as needed */}
    </Stack>
  );
}