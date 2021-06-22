import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Field extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.textLabel}>
                    { this.props.label }
                   
                </Text>
                <Text style={styles.value}> {this.props.info} </Text>
             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textLabel: {
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#fff'
    },
    value: {
        marginVertical: 8,
        fontWeight: 'normal',
        color: '#fff'
    }
})

export default Field;