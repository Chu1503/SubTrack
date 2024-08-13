import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false, animation: 'none'
      }} />
      <Stack.Screen name="add" options={{
        headerShown: false, animationTypeForReplace: 'push',
        animation: 'slide_from_right'
      }} />
      <Stack.Screen name="view" options={{
        headerShown: false, animation:'slide_from_bottom'
      }} />
      <Stack.Screen name="edit" options={{
        headerShown: false, animationTypeForReplace: 'push',
        animation: 'slide_from_right'
      }} />
      {/* Add other screens as needed */}
    </Stack>
  );
}