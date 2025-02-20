import action from '@/redux/store/store';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { ThemeProvider, useTheme } from '@rneui/themed';
import AppNavigator from '@/routes';
import { AuthenticatedProvider } from '@/providers';
import { EventProvider } from 'react-native-outside-press';

export default function RootLayout() {
  const { theme } = useTheme();

  return (
    <AuthenticatedProvider>
      <EventProvider>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <AppNavigator />
            <Toast />
            <StatusBar style="auto" />
          </ThemeProvider>
        </SafeAreaProvider>
      </EventProvider>
    </AuthenticatedProvider>
  );
}
