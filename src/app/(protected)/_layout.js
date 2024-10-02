import { GestureHandlerRootView, HoverEffect } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../../hooks/Auth/index';
import { router } from 'expo-router';

function CustomDrawerContent(props) {
  const { user, signOut } = useAuth();


  return (
    <View style={{ flex: 1, marginTop: 5,}} >
      <View style={{marginTop: 50, justifyContent: 'center', alignItems: 'center', paddingVertical: 10,}}>
        <Image source={{
          uri: "https://www.github.com/miguelwb.png"
        }} 
        style={{width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginBottom: 10,}}
        />
        <Text style={{fontSize: 20, fontFamily: "bold", textAlign: "center",}}>{user?.user?.nome}</Text>
      </View>
      <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={() => router.replace("/")} style={{justifyContent: "center", alignItems: "center", height: 50, margin: 10, backgroundColor: "#B22222", borderRadius: 5, }}>
        <Text style={{color: "white", fontFamily: "bold"}} >Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}


const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name='index' options={{ drawerLabel: "Principal", headerTitle: "Principal", drawerActiveBackgroundColor: "#e6e6e6", drawerActiveTintColor:"#000", drawerIcon: ()=> <Ionicons name='home-outline' size={20} color="black" /> }} />
        <Drawer.Screen name='cadastro' options={{ drawerLabel: "Cadastro de Bicicletas", headerTitle: "Cadastro de Bicicletas",drawerActiveBackgroundColor: "#e6e6e6", drawerActiveTintColor:"#000",drawerIcon: ()=> <Ionicons name='add-circle-outline' size={20} color="black" /> }} />
        <Drawer.Screen name='list' options={{ drawerLabel: "Lista de Bicicletas", headerTitle: "Lista de Bicicletas",drawerActiveBackgroundColor: "#e6e6e6", drawerActiveTintColor:"#000",drawerIcon: ()=> <Ionicons name='bicycle' size={20} color="black" /> }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}



export default function Layout() {
  return DrawerLayout();
}

const styles = StyleSheet.create({
  HoverEffect: {
    color: "black",
    textDecorationColor: "black",
  }
});