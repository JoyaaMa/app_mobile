import { Dimensions, StyleSheet, } from "react-native";

export const styles = StyleSheet.create({
    //cabeçalho 
    container: {
        margin: 0,
        padding: 0,
        backgroundColor: 'f5f5f5#',
        alignItems:'center',

    },

    header:{
        flexDirection:'row',
        paddingLeft:15,
        width: '100%',
        height: Dimensions.get('window').height/10,
        backgroundColor: '#0662b0',
        alignItems:'center',

    },

    text:{
        paddingLeft:55,
        fontSize: 25,
        marginTop: 0,
        fontWeight: 'bold',
        color: '#ebebebff',

    },

    //Opcões
     container1: {
        flex:1,
        margin: 10,
        padding: 25,
        textAlign:'center',
        alignItems:'center',
    },

    titleLista: {
        color:'#ebebebff',
        backgroundColor:'#469be7ff',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius:15,
        borderWidth:0.5,
        borderColor:'#454545ff',
        height:80,
        width:300,
        textAlign:'center',
        paddingTop:20,    
    },

    

})