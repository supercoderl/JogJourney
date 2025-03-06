import { Stack } from "expo-router";
import React from "react";

const AppNavigator: React.FC = () => {
    return (
        <Stack>
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(profile)" options={{ headerShown: false }} />
            <Stack.Screen name="(map)" options={{ headerShown: false }} />
            <Stack.Screen name="(communication)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AppNavigator;
