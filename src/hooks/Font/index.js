import { useFonts } from "expo-font";
import { createContext } from "react";
import { ActivityIndicator, View, Text } from "react-native";


const FontContext = createContext();

export function FontProvider ({ children }) {
    const [loaded, error] = useFonts({
        regular: require("../../assets/fonts/Oswald-Regular.ttf"),
        bold: require("../../assets/fonts/Oswald-Bold.ttf"),
        light: require("../../assets/fonts/Oswald-Light.ttf"),
        medium: require("../../assets/fonts/Oswald-Medium.ttf"),
        semiBold: require("../../assets/fonts/Oswald-SemiBold.ttf"),

    });

    if (!loaded && !error) {
        return( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Carregando as Fontes</Text>
            <ActivityIndicator />
        </View>
        );
      }

    return <FontContext.Provider value={{}}>{children}</FontContext.Provider>;
}

export function useFont () {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error("useFont must be used within a FontProvider");
    }
    return context;
}
