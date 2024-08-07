import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Button, Image } from 'react-native';

export default function BikeRegistrationPage() {
  const [bikes, setBikes] = useState([]);
  const [bikeName, setBikeName] = useState('');
  const [bikeDescription, setBikeDescription] = useState('');
  const [bikeImage, setBikeImage] = useState('');
  const [bikeOwner, setBikeOwner] = useState('');
  const [bikeYear, setBikeYear] = useState('');
  const [selectedBike, setSelectedBike] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddBike = () => {
    if (bikeName && bikeDescription && bikeImage && bikeOwner && bikeYear) {
      setBikes([...bikes, {
        id: String(bikes.length + 1),
        name: bikeName,
        description: bikeDescription,
        image: bikeImage,
        owner: bikeOwner,
        year: bikeYear
      }]);
      setBikeName('');
      setBikeDescription('');
      setBikeImage('');
      setBikeOwner('');
      setBikeYear('');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBike(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Bicicleta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome da Bicicleta"
        value={bikeName}
        onChangeText={setBikeName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={bikeDescription}
        onChangeText={setBikeDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={bikeImage}
        onChangeText={setBikeImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Proprietário"
        value={bikeOwner}
        onChangeText={setBikeOwner}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano de Fabricação"
        value={bikeYear}
        onChangeText={setBikeYear}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddBike}>
        <Text style={styles.buttonText}>Adicionar Bicicleta</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Lista de Bicicletas</Text>
      <ScrollView style={styles.scrollContainer}>
        {bikes.map(bike => (
          <TouchableOpacity
            key={bike.id}
            style={styles.bikeItem}
            onPress={() => {
              setSelectedBike(bike);
              setModalVisible(true);
            }}
          >
            <Image source={{ uri: bike.image }} style={styles.bikeImage} />
            <Text>{bike.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Modal de Detalhes da Bicicleta */}
      {selectedBike && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedBike.image }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedBike.name}</Text>
              <Text>{selectedBike.description}</Text>
              <Text>Proprietário: {selectedBike.owner}</Text>
              <Text>Ano de Fabricação: {selectedBike.year}</Text>
              <Button title="Fechar" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    width: '100%',
  },
  bikeItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bikeImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
