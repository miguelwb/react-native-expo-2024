import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, BackHandler, TextInput, Alert, Image } from 'react-native';
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
      await signIn({ email, password });
      // router.replace("(protected)");
    } catch (error) {
      Alert.alert("⚠️", "E-mail ou senha inválidos");
      // console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/PedalPulseLogo.png')} style={styles.logo} />
      <View style={styles.inputbox}>
        <Ionicons name='mail-open-outline' size={20} color='black' />
        <TextInput style={styles.emailinput} placeholder='E-mail' value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputbox}>
        <Ionicons name='lock-closed-outline' size={20} color='black' />
        <TextInput style={styles.emailinput} placeholder='Senha' value={password} onChangeText={setPassword} secureTextEntry={passwordVisibility} />
        <Ionicons name={passwordVisibility ? "eye-off-outline" : "eye-outline"} size={20} color='black' onPress={tooglePasswordVisibility} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEntrarSuper}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/about")}>
        <Text style={styles.buttonText}>Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => BackHandler.exitApp()}>
        <Text style={styles.buttonText}>Sair do Aplicativo</Text>
      </TouchableOpacity>
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
    padding: 20,
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'regular',
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
  inputbox: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    borderRadius: 15,
    width: '80%',
  },
  emailinput: {
    flex: 1,
    fontFamily: 'regular',
    fontSize: 20,
  }
});
