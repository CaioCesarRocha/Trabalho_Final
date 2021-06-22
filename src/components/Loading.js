import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';

export default function LoadingModal(props) {

    return (
        <Modal
            animationType="fade" visible={props.modalVisible} transparent={true}
        >
            <View style={styles.Container}>
                <ActivityIndicator size="large" color="#6600ff" />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

