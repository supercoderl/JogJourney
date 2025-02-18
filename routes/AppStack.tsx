import { Stack } from "expo-router";
import React from "react";

const AppStack: React.FC = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AppStack;