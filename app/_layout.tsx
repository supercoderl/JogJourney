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

export default function RootLayout() {
  const { theme } = useTheme();

  return (
    <AuthenticatedProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <AppNavigator />
          <Toast />
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthenticatedProvider>
  );
}
