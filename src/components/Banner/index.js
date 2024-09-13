import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
    const [page, setPage] = useState(0);
    const pagerViewRef = useRef(null);

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPage((prevPage) => {
                const nextPage = (prevPage + 1) % 3;
                pagerViewRef.current?.setPage(nextPage);
                return nextPage;
            });
        }, 3000)


        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <PagerView
                ref={pagerViewRef}
                initialPage={0}
                style={styles.content}
                onPageSelected={onPageSelected}
            >
                <View key="1" style={styles.page}>
                    <ImageBackground source={{ uri: "https://wallpapers.com/images/hd/brave-woman-riding-4k-mountain-bike-tga87nlaep2pe1xt.jpg" }} style={styles.img} imageStyle={{ borderRadius: 5 }}>
                        <Text style={styles.text1}>Um pumptrack é uma pista com ondulações e curvas onde ciclistas usam a técnica de "pump" para ganhar velocidade e realizar manobras sem pedalar.</Text>
                    </ImageBackground>
                </View>
                <View key="2" style={styles.page}>
                    <ImageBackground source={{ uri: "https://i.ytimg.com/vi/4_a-JF7ui2E/maxresdefault.jpg" }} style={styles.img} imageStyle={{ borderRadius: 5 }}>
                        <Text style={styles.text2}>A bicicleta de downhill é feita para descer montanhas com alta velocidade e controle, oferecendo suspensões avançadas e estrutura robusta para enfrentar terrenos acidentados.</Text>
                    </ImageBackground>
                </View>
                <View key="3" style={styles.page}>
                    <ImageBackground source={{ uri: "https://png.pngtree.com/thumb_back/fh260/background/20230615/pngtree-mountain-biker-riding-through-dirt-during-sunset-image_2908140.jpg" }} style={styles.img} imageStyle={{ borderRadius: 5 }}>
                        <Text style={styles.text3}>A Mountain Bike (MTB) é projetada para enfrentar terrenos acidentados e trilhas desafiadoras, com suspensão robusta e pneus de alta tração.</Text>
                    </ImageBackground>
                </View>
            </PagerView>
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    content: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    bulletContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    bullet: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#b7b7b7',
        margin: 5,
    },
    activeBullet: {
        backgroundColor: '#000',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    text1: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 150,
    },
    text2: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        position: 'absolute',
        top: 10,
        left: 10,
        width: 150,
    },
    text3: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 140,
    },
});
