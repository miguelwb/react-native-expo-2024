import { Button, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { z } from "zod";
import { useAuth } from "../../hooks/Auth/index"

export default function Cadastro() {
  const [valor, setValor] = useState("R$ 0,00");
  const [categoria, setCategoria] = useState([
    { id: 0, nome: "Selecione uma categoria" },
    { id: 1, nome: "Mountain Bike" },
    { id: 2, nome: "Speed" },
    { id: 3, nome: "BMX" },
    { id: 4, nome: "E-Bike" },
    { id: 5, nome: "Cicloturismo" },
    { id: 6, nome: "Downhill" },
    { id: 7, nome: "Gravel" },
    { id: 8, nome: "Fixa" },
    { id: 9, nome: "Folding" },
    { id: 10, nome: "Freeride" },
    { id: 11, nome: "Trilha" },
    { id: 12, nome: "Urbana" },
  ]);
  const [fabricacao, setFabricacao] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [id, setId] = useState(0);
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const valueRef = useRef();
  useEffect(() => {
    valueRef?.current?.focus();
  }, []);

  const cadastroSchema = z.object({
    user_nome: z.number(),
    marca: z.string(),
    modelo: z.string(),
    data_fabricacao: z.string(),
    valor_estimado: z.number().gt(0),
    categoria: z.string(),
  });

  const convertValue = (value) => {
    try {
      const valorLimpo = value.replace("R$", "").replace(",", "").replace(" ", "");
      const valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        return 0
      }
      return valorConvertido
    } catch (error) {
      setValor("R$ 0,00");
    }
  };

  const handleSubmit = async () => {
    const cadastro = {
      user_nome: Number(user.user.id),
      valor_estimado: convertValue(valor),
      marca,
      modelo,
      data_fabricacao: fabricacao,
      categoria: id,
    };
    try {
      const result = await cadastroSchema.parseAsync(cadastro);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };


  const handleChangeValue = (value) => {
    try {
      const valorLimpo = value.replace("R$", "").replace(",", "").replace(" ", "");
      const valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        setValor("R$ 0,00");
        return;
      }
      let valorPtBR = Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2
      }).format(valorConvertido);
      setValor(`R$ ${valorPtBR}`);
    } catch (error) {
      setValor("R$ 0,00");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <MaterialCommunityIcons name="map-marker-outline" size={20} color="black" />
          <TextInput
            placeholder="Marca"
            value={marca}
            onChangeText={(newValue) => setMarca(newValue)}
            ref={valueRef}
          />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="bicycle-outline" size={20} color="black" />
          <TextInput
            placeholder="Modelo"
            value={modelo}
            onChangeText={(newValue) => setModelo(newValue)}
          />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="calendar-outline" size={20} color="black" />
          <TextInput
            placeholder="Ano Fabricação"
            keyboardType="numeric"
            value={fabricacao}
            onChangeText={(newValue) => setFabricacao(newValue)}
            style={styles.inputAno}
          />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="wallet-outline" size={20} color="black" />
          <TextInput
            keyboardType="numeric"
            value={valor}
            onChangeText={(newValue) => handleChangeValue(newValue)}
            style={styles.inputValor}
          />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="image-outline" size={20} color="black" />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.inputImage}>Selecionar imagem</Text>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <Picker selectedValue={id} onValueChange={(itemValue, index) => {
            setId(itemValue);
          }}
            style={{ width: "100%", height: 120 }} itemStyle={{ height: 120, fontSize: 16, fontFamily: "bold", }}
          >
            {categoria?.map((item) => {
              return <Picker.Item key={item.id} label={item.nome} value={item.id} />
            })}
          </Picker>
        </View>
        <View style={styles.inputButton}>
          <TouchableOpacity style={styles.contentButtons}>
            <Text style={styles.buttonText} onPress={handleSubmit}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentButtons} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  inputImage: {
    fontSize: 16,
    fontFamily: "bold",
  },
})