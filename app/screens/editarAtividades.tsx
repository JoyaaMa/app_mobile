import { format, parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dimensions } from 'react-native';
import { editarAtividade } from '../../services/editarAtividade';
import { Ionicons } from "@expo/vector-icons";

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


                         <Text style={styles.title}>Data de entrega</Text>
                 <TouchableOpacity style={[styles.button, {backgroundColor: '#87CEFA'}, {width: '50%'}]} onPress={() => setDatePickerVisibility(true)}>
                            <Text style={styles.buttonText}>Selecionar</Text>
                 </TouchableOpacity>
                      {data && (
                         <Text style={{ marginTop: 10, color:'black', fontWeight: 'bold', marginBottom: 20, }}> Data selecionada: {format(dataEdit, 'dd/MM/yyyy')}
                        </Text>
                    )}

                            
                     <Text style={[styles.title,  {marginTop: 8}]}>Descrição</Text>
 
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

                   <TouchableOpacity style={[styles.button, {width: '100%', backgroundColor:'#2563EB'}]}
                        onPress={async () => { await editarAtividade(idAtividade, tituloEdit, dataEdit, descricaoEdit);router.back();}} >
                      <Text style={styles.buttonText}>Salvar alterações</Text>
                   </TouchableOpacity>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
            container: {
                justifyContent: 'center',
                backgroundColor: '#E8E8E8'
            },
            card: {
                height:'85%',
                width:'90%',
                backgroundColor: '#F8F8FF',
                borderRadius: 20,
                paddingVertical: 30,
                paddingHorizontal: 25,
                marginTop: 20,
                marginLeft: 20,
            },
            header: {
                    flexDirection:'row',
                    paddingLeft:50,
                    borderBottomEndRadius: 20,
                    borderBottomLeftRadius: 20,
                    width: '100%',
                    height: Dimensions.get('window').height/8,
                    backgroundColor: '#F8F8FF',
                    alignItems:'center',
                    
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
            },
            title: {
                fontSize: 18,
                fontWeight: '500',
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
                color:'white',
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
    
    
