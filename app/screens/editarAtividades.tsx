import { format, parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dimensions } from 'react-native';
import { editarAtividade } from '../../services/editarAtividade';

export default function EditarAtividadeScreen() {

    const router = useRouter();
    const { id, titulo, descricao, data } = useLocalSearchParams();

    const [idAtividade, setId] = useState(''); // <- já preenchido ao carregar a tela
    const [tituloEdit, setTituloEdit] = useState('');
    const [dataEdit, setData] = useState(new Date());
    const [descricaoEdit, setDescricaoEdit] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirm = (date: Date) => {
        setData(date);
        setDatePickerVisibility(false);
    };

    useEffect(() => {
        console.log('Params recebidos:', { id, titulo, descricao, data });
        if (id && titulo && descricao && data) {
            setId(String(id));
            setTituloEdit(String(titulo));
            setDescricaoEdit(String(descricao));
            setData(parse(String(data), 'dd/MM/yyyy', new Date()));
        }
    }, [id, titulo, descricao, data]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleSupremo}>Editar Atividade</Text>
            </View>
            <Text>Título</Text>
            <TextInput
                placeholder="Título"
                value={tituloEdit}
                onChangeText={setTituloEdit}
                style={styles.inputContainer}
            />

            <TouchableOpacity style={[styles.button, {backgroundColor: '#87CEFA'}, {width: '50%'}]} onPress={() => setDatePickerVisibility(true)}>
                <Text>Selecionar</Text>
            </TouchableOpacity>
                {data && (
                    <Text style={{ marginTop: 8 }}>
                    Data selecionada: {format(dataEdit, 'dd/MM/yyyy')}
                    </Text>
                )}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />

            <TextInput
                placeholder="Descrição"
                value={descricaoEdit}
                onChangeText={setDescricaoEdit}
                style={styles.inputContainer}
            />

            <TouchableOpacity
                onPress={async () => {
                    await editarAtividade(idAtividade, tituloEdit, dataEdit, descricaoEdit);
                    router.back(); 
                }}
            >
                <Text>Salvar alteralções</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
                justifyContent: 'center',
                backgroundColor: '#E8E8E8'
            },
            card: {
                backgroundColor: '#F8F8FF',
                width: '85%',
                borderRadius: 20,
                paddingVertical: 30,
                paddingHorizontal: 25,
                marginTop: 20,
                marginLeft: 20,
            },
            header: {
                    width: '100%',
                    height: Dimensions.get('window').height/6,
                    justifyContent: 'center',
                    backgroundColor: "#F8F8FF",
                    borderBottomEndRadius: 20,
                    borderBottomLeftRadius: 20,
                    
               },
            image:{
                    width: 90, 
                    height: 90,
                    borderRadius: 30,
                },
            logo: {
                fontSize: 22,
                fontWeight: 'bold',
                color: '#2563EB',
                marginBottom: 10,
            },
            titleSupremo:{
                fontSize: 25,
                color: '#4169E1',
                fontWeight: 'bold',
                marginBottom: 20,
                marginLeft: 20,
            },
            title: {
                fontSize: 18,
                fontWeight: '600',
                color: '#1E3A8A',
                marginBottom: 10,
            },
            inputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F9FAFB',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 12,
                paddingHorizontal: 10,
                width: '90%',
                marginBottom: 30,
            },
            button: {
                backgroundColor: '#2563EB',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
                height: 45,
                borderRadius: 12,
                marginTop: 10,
            },
            buttonText: {
                color: '#fff',
                fontWeight: '600',
                fontSize: 16,
                marginRight: 6,
            },
            footer: {
                flexDirection: 'row',
                marginTop: 20,
            },
            footerText: {
                color: '#374151',
            },
            footerLink: {
                color: '#2563EB',
                fontWeight: '600',
            },
        });
    
    
