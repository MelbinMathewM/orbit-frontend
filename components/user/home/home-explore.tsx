import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeExplore() {
    return (
        <ImageBackground
            source={require("../../../assets/images/home-hero1.jpeg")}
            style={{ width: width }}
            blurRadius={2}
        >
            <View className="bg-black/30 px-6 py-8">
                <Text className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-4">
                    Embark on Adventures with Orbit Travels
                </Text>
                <Text className="text-white/90 dark:text-gray-200 text-lg mb-6">
                    Set out on unforgettable journeys with ORBIT Travels, where each adventure is crafted
                    to inspire and thrill. From exotic destinations to hidden gems, our expertly designed
                    itineraries promise unique experiences and seamless travel, ensuring every moment is
                    filled with discovery and wonder.
                </Text>

                <TouchableOpacity
                    onPress={() => router.push("/contact")}
                    className="flex-row items-center bg-orange-500 px-6 py-3 rounded-full shadow-lg self-start"
                >
                    <Text className="text-white font-semibold mr-2">Explore More</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
