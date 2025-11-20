import { Dimensions,StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        
    },
    header: {
            width: '100%',
            height: Dimensions.get('window').height/8,
            backgroundColor: '#0662b0',
            justifyContent: 'flex-start',
        },
    boxPrincipal:{ 
        margin: 10, 
        padding: 10,
    },
    titulo:{
        fontSize: 20, 
        marginBottom: 10,
        left: 10,
    },
    
    descrition:{
        padding:8,
        margin: 9,
        marginBottom: 20,
        width: 250,
        height: 150,
        borderWidth: 1,
        borderColor: "#87CEFA",
        borderRadius: 10,
        backgroundColor: 'azure',
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 5, // Necessário para sombra no Android
      },

      botao:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        margin:15,
      },

      index:{
        alignItems:'center',
        textAlign:'center',
        fontWeight:'bold',
       },

      ButtonText:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        margin:15,
        borderColor: '#0662b0',
        borderWidth: 1,
        backgroundColor:'#0662b0',
        color:'#ffffff',
        fontSize:14,
        fontWeight:'bold',
        borderRadius:20,
        padding:4,
        width:150,
        height:40,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 5, // Necessário para sombra no Android

      },

      title: {
        color:'#0662b0',
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign:'center',
        justifyContent:'center',
       },
       
      input: {
        padding:8,
        margin: 9,
        marginBottom: 20,
        width: 250,
        height: 45,
        borderWidth: 1,
        borderColor: "#87CEFA",
        borderRadius: 20,
        backgroundColor: 'azure',
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 5, // Necessário para sombra no Android
      },
});