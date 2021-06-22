import React, {Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';

class ComponentPicker extends Component {
       
    render() {
        let list = this.props.listaItens.map((valor, id) => {
            return <Picker.Item key={id} value={valor.descricao} label={valor.descricao} />
        })

        return (
            <View style={styles.container}>
                <Text> {this.props.label} </Text>
                <View style={styles.body}>
                    <Picker
                        selectedValue={this.props.valorSelecionado}
                        onValueChange={(itemValue) => {
                            this.props.action(this.props.field, itemValue)  
                        }}
                    >
                        <Picker.Item value='' label={`Selecione a ${ this.props.field}`} />
                        {list}
                    </Picker>
                </View>
            </View>
        );
    }
}    

const styles = StyleSheet.create({
    container: {
        minWidth: 200,
        marginTop: 10
    }, 
    body: {
        height: 45,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6600ff',
        justifyContent: 'center',
        marginTop: 5
    }       
});

export default ComponentPicker;