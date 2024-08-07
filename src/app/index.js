import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginPage from './LoginPage';
import BikeRegistrationPage from './BikeRegistrationPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <BikeRegistrationPage />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
