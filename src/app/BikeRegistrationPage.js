import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function BikeRegistrationPage() {
  const [bikes, setBikes] = useState([]);
  const [bikeBrand, setBikeBrand] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [bikeDescription, setBikeDescription] = useState('');
  const [bikeImage, setBikeImage] = useState('');
  const [bikeOwner, setBikeOwner] = useState('');
  const [bikeYear, setBikeYear] = useState('');
  const [bikeCategory, setBikeCategory] = useState('mtb');
  const [selectedBike, setSelectedBike] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddBike = () => {
    if (bikeBrand && bikeModel && bikeDescription && bikeImage && bikeOwner && bikeYear) {
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
            <View style={styles.bikeInfo}>
              <Text>{bike.brand} {bike.model}</Text>
              <Text>Categoria: {bike.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
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
              <Text>Categoria: {selectedBike.category}</Text>
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
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
  bikeInfo: {
    flex: 1,
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
