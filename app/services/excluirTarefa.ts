import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export async function excluirAtividade(id: string) {
  try {
    const atividadesJSON = await AsyncStorage.getItem('atividades');
    let atividades = atividadesJSON ? JSON.parse(atividadesJSON) : [];

    console.log('Atividades antes:', atividades);
    console.log('ID a excluir:', id);

    // Remove a atividade com o id correspondente
    const novasAtividades = atividades.filter((atividade: any) => atividade.id !== id);

    console.log('Depois da exclusão:', novasAtividades);

    // Salva a nova lista no AsyncStorage
    await AsyncStorage.setItem('atividades', JSON.stringify(novasAtividades));

    Toast.show({
      type: 'success',
      text1: 'Atividade excluída!',
      position: 'top',
      topOffset: 100,
    });
  } catch (error) {
    console.log('Erro ao excluir atividade:', error);
  }
}