import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import PlayersShow from '../components/PlayersShow';
import ComponentHeader from '../components/Header';

import { db } from '../../firebaseConfig';


export default function ListPlayers({ navigation }) {

    useEffect(() => {
        getPlayers();
    }, [])
    
    const [players, setJogadores] = useState([])

    const getPlayers = () => {
        db.collection("Jogadores").onSnapshot((snapshot) => {
          setJogadores([])
          snapshot.forEach(item => {
            let player = item.data()
            player.id = item.id
            setJogadores(players => [...players, player])
          })
        }),
          (error) => {
            console.log(error)
          }; 
    }
    const screenPlayersRegister = () => {
        navigation.navigate('PlayersRegister', { name: 'PlayersRegister' })
    }

    return(
        <SafeAreaView style={styles.container}>
            <ComponentHeader title={"Lista de Jogadores"} navigation={navigation} />  
            <View style={styles.body}>
                <PlayersShow data={players}/>
                <View style={styles.containerBTN}>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={screenPlayersRegister}
                    >
                        <Text style={styles.textoBtn}> Inserir Novo Jogador </Text>                
                    </TouchableOpacity>
                </View> 
            </View>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    body: {
        padding: 20
    },
    containerBTN:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn:{
        padding: 10,
        backgroundColor: '#751aff',
        width: 250,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30
    },
    textoBtn:{
        color: '#FFF',
        fontWeight: 'bold'
    },

})