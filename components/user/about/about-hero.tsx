import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function AboutHero() {
    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <View className="p-6 items-center">

                {/* Heading */}
                <Text className="text-2xl font-heading font-bold text-center text-orange-600 dark:text-orange-400 mt-6 mb-4">
                    UNRIVALED SERVICE FOR YOUR TRAVEL PLEASURES
                </Text>

                {/* Description */}
                <Text className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-6">
                    We Orbit Travel & Tours, take pride in being your trusted travel
                    partner, committed to providing a stress-free experience from
                    beginning to end. Our team of dedicated travel professionals is
                    focused on making every aspect of your journey smooth and enjoyable.
                    With our vast expertise and personalized service, we aim to deliver
                    the best travel solutions tailored to your unique needs, ensuring an
                    exceptional and unforgettable travel experience.
                </Text>

                {/* Image */}
                <Image
                    source={require("../../../assets/images/about-1.png")}
                    style={{
                        width: width - 60,
                        height: 180,
                        borderRadius: 16,
                        resizeMode: "contain",
                        marginBottom: 20,
                        marginTop: 10,
                    }}
                />
            </View>
        </View>
    );
}
