import React from 'react';
import { StyleSheet, View} from 'react-native';
import Field from './Field';

export default function PlayersInfo(player) {
    return (
            <View style={styles.container}>
                <Field
                    label="Nome:"
                    info={player.player.nome}
                />
                <Field
                    label="Idade:"
                    info={player.player.idade}
                />
                <Field
                    label="Nacionalidade:"
                    info={player.player.nacionalidade}
                />
                <Field
                    label="Clube:"
                    info={player.player.clube}
                />
                <Field
                    label="Posição:"
                    info={player.player.posicao}
                />
                <Field
                    label="Salário:"
                    info={`R$ ${player.player.salario}`}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius:8,
        marginVertical: 10,
        backgroundColor: '#6600ff',
    },
})