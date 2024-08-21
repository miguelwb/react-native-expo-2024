import { Text, View } from "react-native";

export default function Home() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>List</Text>
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