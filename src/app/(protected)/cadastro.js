import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Cadastro() {
  const [valor, setValor] = useState("R$ 0,00");
  const [categoria, setCategoria] = useState([
    {id: 0, nome: "Selecione uma categoria"},
    {id: 1, nome: "Mountain Bike"},
    {id: 2, nome: "Speed"},
    {id: 3, nome: "BMX"},
    {id: 4, nome: "E-Bike"},
    {id: 5, nome: "Cicloturismo"},
    {id: 6, nome: "Downhill"},
    {id: 7, nome: "Gravel"},
    {id: 8, nome: "Fixa"},
    {id: 9, nome: "Folding"},
    {id: 10, nome: "Freeride"},
    {id: 11, nome: "Trilha"},
    {id: 12, nome: "Urbana"},
  ]);
  const [id, setId] = useState(0);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput 
          placeholder="Marca"
        />
      </View>
      <View style={styles.inputView}>
        <Ionicons name="bicycle-outline" size={20} color="black" />
        <TextInput 
          placeholder="Modelo"
        />
      </View>
      <View style={styles.inputView}>
        <Ionicons name="calendar-outline" size={20} color="black" />
        <TextInput 
          placeholder="Ano Fabricação"
          style={styles.inputAno}
        />
      </View>
      <View style={styles.inputView}>
        <Ionicons name="wallet-outline" size={20} color="black" />
        <TextInput 
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
          style={styles.inputValor}
        />
      </View>
      <View style={styles.inputView}>
        <Ionicons name="image-outline" size={20} color="black" />
        <TextInput 

        />
      </View>
      <View style={styles.inputView}>
        <Picker selectedValue={id} onValueChange={(itemValue, index) => {
          setId(itemValue);
        }}
        style={{width: "100%", height: 44}} itemStyle={{height: 44}}
        >
          {categoria?.map((item) => {
            return <Picker.Item key={item.id} label={item.nome} value={item.id} />
          })}
        </Picker>
      </View>
      <View style={styles.inputButton}>  
        <TouchableOpacity style={styles.contentButtons}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentButtons} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    flexDirection: "row",
  },
  inputButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  contentButtons: {
    backgroundColor: '#B22222',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: 100,
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
})