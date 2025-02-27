import { Stack } from "expo-router";
import React from "react";

export default function ProfileStack() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="edit-information" />
            <Stack.Screen name="setting" />
            <Stack.Screen name="payment" />
        </Stack>
    );
}