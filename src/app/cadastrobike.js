import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Button, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function BikeRegistrationPage() {
  const [bikes, setBikes] = useState([]);
  const [bikeBrand, setBikeBrand] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [bikeDescription, setBikeDescription] = useState('');
  const [bikeImage, setBikeImage] = useState('');
  const [bikeOwner, setBikeOwner] = useState('');
  const [bikeYear, setBikeYear] = useState('');
  const [bikeCategory, setBikeCategory] = useState('select');
  const [selectedBike, setSelectedBike] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddBike = () => {
    if (!bikeBrand || !bikeModel || !bikeDescription || !bikeImage || !bikeOwner || !bikeYear || bikeCategory === 'select') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setBikes([...bikes, {
      id: String(bikes.length + 1),
      brand: bikeBrand,
      model: bikeModel,
      description: bikeDescription,
      image: bikeImage,
      owner: bikeOwner,
      year: bikeYear,
      category: bikeCategory,
    }]);
    
    setBikeBrand('');
    setBikeModel('');
    setBikeDescription('');
    setBikeImage('');
    setBikeOwner('');
    setBikeYear('');
    setBikeCategory('select');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBike(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Bicicleta</Text>

      <TextInput
        style={styles.input}
        placeholder="Marca da Bicicleta"
        value={bikeBrand}
        onChangeText={setBikeBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo da Bicicleta"
        value={bikeModel}
        onChangeText={setBikeModel}
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

      <Picker
        selectedValue={bikeCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setBikeCategory(itemValue)}
      >
        <Picker.Item label="Selecione a Categoria" value="select" />
        <Picker.Item label="MTB" value="mtb" />
        <Picker.Item label="Downhill" value="downhill" />
        <Picker.Item label="Road" value="road" />
        <Picker.Item label="Speed" value="speed" />
        <Picker.Item label="Hybrid" value="hybrid" />
        <Picker.Item label="Urban" value="urban" />
        <Picker.Item label="BMX" value="bmx" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAddBike}>
        <Text style={styles.buttonText}>Adicionar Bicicleta</Text>
      </TouchableOpacity>

      <Text style={styles.title2}>Lista de Bicicletas</Text>

      <View style={styles.bikeList}>
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
            <View style={styles.bikeInfo}>
              <Text style={styles.bikeText}>{bike.brand} {bike.model}</Text>
              <Text style={styles.categoryText}>Categoria: {bike.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

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
              <Text style={styles.modalTitle}>{selectedBike.brand} {selectedBike.model}</Text>
              <Text>{selectedBike.description}</Text>
              <Text style={styles.categoryText}>Categoria: {selectedBike.category}</Text>
              <Text>Proprietário: {selectedBike.owner}</Text>
              <Text>Ano de Fabricação: {selectedBike.year}</Text>
              <Button title="Fechar" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  title2: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  input: {
    height: 45,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bikeList: {
    marginTop: 20,
  },
  bikeItem: {
    padding: 15,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 1,
  },
  bikeImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  bikeInfo: {
    flex: 1,
  },
  bikeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryText: {
    color: '#6c757d',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
});
