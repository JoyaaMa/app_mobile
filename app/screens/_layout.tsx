import { Tabs } from 'expo-router';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <>
      <Tabs initialRouteName="homeScreen" screenOptions={{
          headerShown: false, // isso remove o título de todas as telas
        }}>
        <Tabs.Screen name="homeScreen" options={{ tabBarLabel: 'Tela inicial', tabBarIcon: () => (<MaterialCommunityIcons name= 'list-status' color='grey' size={25} />), }} />
        <Tabs.Screen name="adicionarAtividade" options={{ title: 'Adicionar atividade', tabBarIcon: () => (<MaterialCommunityIcons name= 'plus' color='grey' size={30} />), }} />
        <Tabs.Screen name="configuracao" options={{ title: 'Configurações', tabBarIcon: () => (<MaterialCommunityIcons name= 'cog' color='grey' size={25} />) }}/>
        <Tabs.Screen name="editarAtividades" options={{ href: null, title: 'Editar' }}/>
        <Tabs.Screen name="editarPerfil" options={{ href: null, title: 'Editar Perfil' }}/>
        <Tabs.Screen name="suporte" options={{ href: null, title: 'Suporte' }}/>
      </Tabs>
      <Toast />
    </>
  );
}