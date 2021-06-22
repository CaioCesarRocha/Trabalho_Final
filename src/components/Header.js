import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { fb_init } from '../../firebaseConfig';

export default function ComponentHeader(props) {
    const out = async () => {
        try {
            await fb_init.auth().signOut()
            if(props.title === "Cadastrar Jogador")
                props.navigation.navigate('Login', { name: 'Login' })
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.textTitle}>{props.title}</Text>
               
            </View>
            <Image 
                    style={styles.logo}
                    source={require('../../assets/FIFA_old.png')}
                > 
            </Image>
            {
                props.title === "Cadastrar Jogador" || props.title === "Lista de Jogadores" ?
                    <Icon name="closecircle" size={15} color="#751aff" onPress={() => out()} />
                : 
                    null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#751aff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        padding: 20,     
    },
    textTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,      
        alignSelf: "center"
    },
    logo: {
        width: 115,
        height: 65,
        alignSelf: "center",
    },

})