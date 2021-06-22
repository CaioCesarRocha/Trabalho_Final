import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

class Input extends Component {
    
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.textLabel}> {this.props.label} </Text>
                <TextInput 
                    style={styles.body}
                    onChangeText={(text) => {this.props.action(text)}}
                    placeholder={this.props.placeholder}                   
                    value={this.props.value}
                    keyboardType={this.props.tipoTeclado}
                    secureTextEntry={this.props.security}
                />
             </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        minWidth: 200,
        marginTop: 10
    },
    body:{
        padding: 7,
        borderColor: '#6600ff',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,       
    },
    textLabel:{
        color: '#6600ff',
        fontWeight: 'bold',
    }
})

export default Input;