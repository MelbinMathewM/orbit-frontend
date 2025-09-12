import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const hero_1 = require("../../../assets/images/home-hero11.jpg");
const hero_2 = require("../../../assets/images/home-hero22.jpg");
const hero_3 = require("../../../assets/images/home-hero33.jpg");

const { width, height } = Dimensions.get("window");

const images = [
    hero_1,
    hero_2,
    hero_3
];

const HomeHero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                key={index}
                entering={FadeIn.duration(1000)}
                exiting={FadeOut.duration(1000)}
                style={StyleSheet.absoluteFillObject}
            >
                <ImageBackground
                    source={images[index]}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <View style={styles.overlay} />
                </ImageBackground>
            </Animated.View>

            {/* Content */}
            <View style={styles.contentWrapper}>
                <Text style={styles.heading}>
                    Set Sail with{"\n"}<Text style={styles.brand}>Orbit Travels</Text>
                </Text>

                <Text style={styles.subtext}>
                    Embark on an extraordinary journey with ORBIT Travels. Let us transform your
                    travel aspirations into unforgettable adventures, where each destination holds
                    a unique story waiting to unfold.
                </Text>

                <TouchableOpacity style={styles.button} onPress={() => router.push("/services")}>
                    <Text style={styles.buttonText}>Discover Now</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    contentWrapper: {
        position: "absolute",
        paddingHorizontal: 20,
        alignItems: "center",
    },
    heading: {
        fontSize: 40,
        fontWeight: "700",
        color: "white",
        marginBottom: 24,
        textAlign: "center",
    },
    brand: {
        fontSize: 56    ,
        color: "#EA580C",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    subtext: {
        fontSize: 20,
        color: "rgba(255,255,255,0.9)",
        lineHeight: 30,
        textAlign: "center",
        maxWidth: "90%",
    },
    button: {
        marginTop: 24,
        backgroundColor: "#EA580C",
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    iconsRow: {
        flexDirection: "row",
        marginTop: 25,
    },
    placeholder: {
        fontSize: 32,
        color: "white",
    },
});

export default HomeHero;
