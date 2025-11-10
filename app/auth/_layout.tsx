import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <>
      <Stack initialRouteName="login" screenOptions={{
          headerShown: false, // isso remove o título de todas as telas
        }}>
        <Stack.Screen name="login" options={{ title: 'Entrar' }} />
        <Stack.Screen name="criarConta" options={{ title: 'Criar conta' }} />
      </Stack>
      <Toast />
    </>
  );
}