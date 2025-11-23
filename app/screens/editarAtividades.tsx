import { format, parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dimensions } from 'react-native';
import { editarAtividade } from '../../services/editarAtividade';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView} from 'react-native';
import { Platform } from 'react-native';

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
        <View style={styles.background}>
                    <LinearGradient
                        colors={['#E8F0FF', '#C5D8FF']}
                        style={StyleSheet.absoluteFillObject}
                    ></LinearGradient>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={styles.container}
                    ></KeyboardAvoidingView>
        
                <View style={styles.header}>
                      <Ionicons name='pencil-sharp' size ={31} color = '#4169E1'/>
                     <Text style={styles.titleSupremo}>Editar Atividade</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Título:</Text>
                    <TextInput
                        placeholder="Título"
                        value={tituloEdit}
                        onChangeText={setTituloEdit}
                        style={styles.inputContainer}
                    />
                    
 
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                    <Text style={[styles.title, {marginTop: 8}]}>Descrição</Text>
                    <TextInput
                        placeholder="Descrição:"
                        value={descricaoEdit}
                        onChangeText={setDescricaoEdit}
                        style={styles.inputContainer}
                    />

                    <Text style={styles.title}>Data:</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {data && (
                            <Text style={{fontWeight: 'bold', marginTop: 10, fontSize: 16,}}>
                                Data selecionada: {format(dataEdit, 'dd/MM/yyyy')}
                            </Text>
                        )}
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#4682B4'}, {width: '20%'}]} onPress={() => setDatePickerVisibility(true)}>
                            <MaterialCommunityIcons name='calendar-today' size ={30} color = 'white'/>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={() => setDatePickerVisibility(false)}
                        />
                        
                    </View>

                   <TouchableOpacity style={[styles.button, {width: '100%', backgroundColor:'#2563EB'}, {marginTop: 70,}]}
                        onPress={async () => { await editarAtividade(idAtividade, tituloEdit, dataEdit, descricaoEdit);router.back();}} >
                      <Text style={styles.buttonText}>Salvar alterações</Text>
                   </TouchableOpacity>
                </View>
                </View>
    );
}

const styles = StyleSheet.create({
        background:{
            flex: 1,
        },
        container: {
            justifyContent: 'center',
            backgroundColor: '#E8E8E8',
        },
        card: {
            backgroundColor: '#F8F8FF',
            width: '90%',
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 25,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'flex-start',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
        },
        header: {
            flexDirection:'row',
            paddingLeft:20,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            width: '100%',
            height: Dimensions.get('window').height/8,
            backgroundColor: '#F8F8FF',
            alignItems:'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
                
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
            marginBottom: 0,
            marginLeft: 25,
            marginTop:0,
           // marginBottom: 20,
           // marginLeft: 20,
        },
        title: {
            fontSize: 20,
            fontWeight: '600',
            color: '#00008B',
            marginBottom: 5,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 10,
            width: '100%',
            marginBottom: 30,
        },
        button: {
            backgroundColor: '#2563EB',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 45,
            borderRadius: 12,
        },
        buttonText: {
            color: '#ffffffff',
            fontSize: 14,
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

