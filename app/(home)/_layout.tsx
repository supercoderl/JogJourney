import AppStack from "@/routes/AppStack";
import React from "react";
import { useFonts } from 'expo-font';

export default function AppLayout() {
    const [fontsLoaded, fontError] = useFonts({
        'Jomhuria': require('@/assets/fonts/Jomhuria-Regular.ttf'),
        'Lohit Bengali': require('@/assets/fonts/Lohit-Bengali.ttf')
    });

    return <AppStack />
}