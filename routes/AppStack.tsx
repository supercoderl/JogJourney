import assets from "@/assets";
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

const AppStack: React.FC = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarStyle: { height: 60 },
            tabBarLabelStyle: { marginBlock: 'auto' },
            tabBarIconStyle: { marginBlock: 'auto' },
            tabBarActiveBackgroundColor: '#07476D',
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Cộng đồng',
                    tabBarIcon: () => <Image source={assets.image.communities} style={{ width: 24, height: 24 }} />,
                }}
            />
        </Tabs>
    );
};

export default AppStack;