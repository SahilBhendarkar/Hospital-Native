import 'react-native-gesture-handler';

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ToastProvider } from './src/context/ToastContext';
import { OfflineSyncProvider } from './src/context/OfflineSyncContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ToastProvider>
          <OfflineSyncProvider>
            <AppNavigator />
          </OfflineSyncProvider>
        </ToastProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
