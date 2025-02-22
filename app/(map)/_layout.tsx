import { Stack } from "expo-router";
import React from "react";

export default function MapStack() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"  />
            <Stack.Screen name="map-selection" />
            <Stack.Screen name="save" />
            <Stack.Screen name="detail" />
        </Stack>
    );
}