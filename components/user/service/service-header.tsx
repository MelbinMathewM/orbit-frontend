import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function ServiceHeader() {
    return (
        <ImageBackground
            source={require("../../../assets/images/about-header.jpeg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <Text style={styles.heading}>Our Services</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
        letterSpacing: 2,
    },
});
