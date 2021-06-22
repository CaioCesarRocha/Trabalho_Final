import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';

class ComponentSlider extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text> {this.props.titulo} </Text>
                <View style={styles.body}>
                    <Slider
                        style={styles.slider}
                        thumbTintColor='##00cc00'
                        minimumTrackTintColor="##d62929"
                        maximumTrackTintColor="##00cc00"
                        maximumValue={this.props.valorMax}
                        minimumValue={this.props.valorMin}
                        onValueChange={(itemValue) => {
                            const newValue = itemValue.toFixed(2)
                            this.props.action(this.props.field, newValue)
                        }}
                    />
                    <Text style={styles.value}> {this.props.valorSlider} </Text>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        justifyContent: 'center',       
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    slider: {
        marginTop: 15,
        width: 200,
        height: 20
    },
    value: {
        fontWeight: 'bold'
    }
})


export default ComponentSlider;