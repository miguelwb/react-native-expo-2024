import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/Auth';

export default function App() {
  const { signIn } = useAuth();

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email: "super@email.com", password: "A123456a!" });
      router.replace("/(protected)");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo Pronto Para Usar</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleEntrarSuper}
      >
        <Text style={styles.buttonText}>Signin Super</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn({ email: "adm@gmail.com", password: "Adm123!" })}
      >
        <Text style={styles.buttonText}>Signin Adm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn({ email: "user@gmail.com", password: "User123!" })}
      >
        <Text style={styles.buttonText}>Signin User</Text>
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
});
