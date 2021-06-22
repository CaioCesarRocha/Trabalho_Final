import React from 'react';
import { StyleSheet, FlatList, View, Text, ViewComponent} from 'react-native';
import PlayersInfo from './PlayersInfo';

export default function PlayersShow({ data }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Jogadores Cadastrados
            </Text>
            <FlatList
                data={data}
                key={item => item.id}
                renderItem={({ item }) => <PlayersInfo player={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6600ff',
        textAlign: "center",
    }
})
