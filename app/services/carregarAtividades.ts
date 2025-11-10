import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAtividades() {
    const [atividades, setAtividades] = useState<any[]>([]);

    const carregarAtividades = useCallback(async () => {
        const dados = await AsyncStorage.getItem('atividades');
        setAtividades(dados ? JSON.parse(dados) : []);
    }, []);

    useFocusEffect(
        useCallback(() => {
          carregarAtividades();
        }, [carregarAtividades])
    );

  return { atividades, carregarAtividades };
}
