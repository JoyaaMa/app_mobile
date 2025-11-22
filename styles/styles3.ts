import { Dimensions, StyleSheet, } from "react-native";

export const styles = StyleSheet.create({
    //cabeçalho 
    container: {
        margin: 0,
        padding: 0,
        backgroundColor: '#E8E8E8',
        alignItems:'center',

    },

    header:{
        flexDirection:'row',
        paddingLeft:15,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        width: '100%',
        height: Dimensions.get('window').height/8,
        backgroundColor: '#F8F8FF',
        alignItems:'center',

    },

    text:{
        paddingLeft:55,
        fontSize: 25,
        marginTop: 0,
        fontWeight: 'bold',
        color: '#4169E1',

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
        backgroundColor:'#2563EB',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius:100,
        borderWidth:0.5,
        borderColor:'#454545ff',
        height:60,
        width:300,
        textAlign:'center',
        paddingTop:15,    
        
    },

    

})