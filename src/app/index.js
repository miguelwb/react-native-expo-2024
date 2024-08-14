import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import BikeRegistrationPage from './BikeRegistrationPage';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/Auth';

export default function App() {
  const { signIn, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo Pronto Para Usar</Text>
      <Button title='Signin Super' onPress={() => signIn({ email: "super@gmail.com", password: "Super123!" })} />
      <Button title='Signin Adm' onPress={() => signIn({ email: "adm@gmail.com", password: "Adm123!" })} />
      <Button title='Signin' onPress={() => signIn({ email: "user@gmail.com", password: "User123!" })} />
      <Button title='Signout' onPress={() => signOut()} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});