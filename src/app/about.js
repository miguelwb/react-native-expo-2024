import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/foto1.png')} style={styles.logo} />
            <Text style={styles.title2}>Desenvolvedor: Luis Miguel</Text>
            <View style={styles.container2}>
                <Text style={styles.title}>Sobre</Text>
                <Text style={styles.description}>
                    Este é um aplicativo desenvolvido para a venda de bicicletas e acessórios.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        position: 'absolute',
        bottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 0,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#B22222',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'bold',
    },
    logo: {
        width: 300,
        height: 300,
        borderRadius: "1000%",
        position: "absolute",
        top: 10,
    },
});

export default AboutScreen;
