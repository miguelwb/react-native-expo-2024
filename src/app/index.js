import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button, BackHandler, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const tooglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password});
      // router.replace("(protected)");
     console.log("Entrou");
    } catch (error) {
      console.log("Erro");
      Alert.alert("⚠️", "E-mail ou senha inválidos");
      // console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo Pronto Para Usar</Text>
      <View style={styles.inputbox}>
        <Ionicons name='mail-open-outline' size={20} color='black' />
        <TextInput style={styles.emailinput} placeholder='E-mail' value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputbox}>
        <Ionicons name='lock-closed-outline' size={20} color='black' />
        <TextInput style={styles.emailinput} placeholder='Senha' value={password} onChangeText={setPassword} secureTextEntry={passwordVisibility} />
        <Ionicons name={passwordVisibility ? "eye-off-outline" : "eye-outline"} size={20} color='black' onPress={tooglePasswordVisibility} />
      </View>
      
      <Button 
        title='Entrar'
        style={styles.button}
        onPress={handleEntrarSuper}
      />
      <Button 
        title='Sobre'
        style={styles.button}
        onPress={() => router.push("/about")}/>
      <Button 
        title='Sair do Aplicativo' 
        style={styles.button}
        onPress={() => BackHandler.exitApp()} />
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
    fontFamily: 'regular',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputbox: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    borderRadius: 20,
  },
  emailinput:{
    flex: 1,
    fontFamily: 'regular',
    fontSize: 20,
  }
});
