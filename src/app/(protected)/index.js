import { View } from "react-native";
import { Banner } from "../../components/Banner";


export default function Home() {

    return(
        <View style={{flex: 1}}>
            <Banner />
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