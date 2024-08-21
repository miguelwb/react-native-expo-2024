import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks/Auth";


export default function Home() {
const { signOut } = useAuth();

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>Home</Text>
            <Button title="Sair" onPress={() => signOut()} />
        </View>
    )
}

const styles = {
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'regular',
    }
}