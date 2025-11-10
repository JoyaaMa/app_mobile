import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient'
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    async function verificacaoLogin() {
        try {

            if (!email || !password) {
                return Alert.alert('Atenção', 'Preencha todos os campos!');
            }
        
            // Pega todos os usuários salvos
            const usuariosJSON = await AsyncStorage.getItem('usuarios');
            const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
        
            // Tenta encontrar um usuário com o e-mail e senha informados
            const usuarioEncontrado = usuarios.find(
                (u: any) => u.email === email && u.senha === password
            );
        
            if (usuarioEncontrado) {
                // Login bem-sucedido
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso',
                    text2: 'Login bem-sucedido...',
                    position: 'top',
                    topOffset: 100,
                });

                // (Opcional) salvar o usuário logado em AsyncStorage
                await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            
                // Redirecionar para a tela inicial
                setTimeout(() => {
                    router.push('/screens/homeScreen');
                }, 1100);
                } else {
                // Falha no login
                Alert.alert('Erro', 'E-mail ou senha inválidos!');
                }
            
            } catch (error) {
                console.log(error);
        }
    }
   
    return (
        <View style={styles.background}>
            <LinearGradient
                colors={['#E8F0FF', '#C5D8FF']}
                style={StyleSheet.absoluteFillObject}
            ></LinearGradient>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
        <View style={styles.card}>
            <Image
                source={require('../../assets/images/logo_planEdu.jpeg')}
                style={styles.image}
            />

            <Text style={styles.logo}>Login</Text>
            <Text style={styles.title}>Bem-vindo(a) ao PlanEdu 👋</Text>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="email" size={22} color="#6B7280" style={styles.icon} />
                <TextInput style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
             </View>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="lock" size={22} color="#6B7280" style={styles.icon} />
                <TextInput style={styles.input}
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            </View>
            
           
            

            <TouchableOpacity onPress={verificacaoLogin} style={styles.button}> 
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Não possui possui conta?</Text>
                <TouchableOpacity onPress={() => router.push('/auth/criarConta')}>  
                    <Text style={styles.footerLink}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        </KeyboardAvoidingView>
        </View>
    );};

    const styles = StyleSheet.create({
        background: {
            flex: 1,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        card: {
            backgroundColor: '#fff',
            width: '85%',
            borderRadius: 20,
            paddingVertical: 40,
            paddingHorizontal: 25,
            alignItems: 'center',
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
        title: {
            fontSize: 18,
            fontWeight: '600',
            color: '#1E3A8A',
            marginBottom: 30,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 10,
            marginBottom: 15,
            width: '100%',
        },
        icon: {
            marginRight: 8,
        },
        input: {
            flex: 1,
            height: 45,
            color: '#111827',
        },
        button: {
            backgroundColor: '#2563EB',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
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

