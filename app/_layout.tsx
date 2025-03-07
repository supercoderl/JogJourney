import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider, useTheme } from '@rneui/themed';
import AppNavigator from '@/routes';
import { AuthenticatedProvider } from '@/providers';
import { EventProvider } from 'react-native-outside-press';
import { MenuProvider } from 'react-native-popup-menu';

export default function RootLayout() {
  const { theme } = useTheme();

  return (
    <AuthenticatedProvider>
      <EventProvider>
        <MenuProvider>
          <SafeAreaProvider>
            <ThemeProvider theme={theme}>
              <AppNavigator />
              <Toast />
              <StatusBar style="auto" />
            </ThemeProvider>
          </SafeAreaProvider>
        </MenuProvider>
      </EventProvider>
    </AuthenticatedProvider>
  );
}
