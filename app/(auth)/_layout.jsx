import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="log-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="otp-screen"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;