import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import PedalPulseLogo from '../assets/PedalPulseLogo.png';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showInputs, setShowInputs] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showInputs ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: showInputs ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showInputs]);

  const handleButtonPress = (action) => {
    setShowInputs(true);
    setCurrentAction(action);
  };

  const handleBackPress = () => {
    setShowInputs(false);
    setUsername('');
    setPassword('');
    setCurrentAction(null);
  };

  const handleLogin = () => {
    console.log('Login', username, password);
    if (username && password) {
      onLogin();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image source={PedalPulseLogo} style={styles.logo} />

      <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {showInputs && (
          <>
            <Text style={styles.title}>
              {currentAction === 'login' ? 'Entrar' : 'Cadastrar'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nome de Usuário"
              value={username}
              onChangeText={setUsername}
              autoFocus
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {currentAction === 'login' ? (
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {!showInputs && (
        <>
          <TouchableOpacity
            style={[styles.button, styles.enterButton]}
            onPress={() => handleButtonPress('login')}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => handleButtonPress('register')}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 8,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  enterButton: {
    backgroundColor: '#df4312',
  },
  registerButton: {
    backgroundColor: '#eda714',
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#df4312',
  },
});
