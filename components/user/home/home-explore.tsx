import React from "react";
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function ParallaxSection() {
    return (
        <View className="bg-gray-50 dark:bg-gray-950">
            {/* Fixed Background */}
            <ImageBackground
                source={require("../../../assets/images/home-hero1.jpeg")}
                style={{
                    width: width,
                    height: 360,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0.3,
                }}
                blurRadius={2}
            />

            <View className="px-6 py-12">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white pt-8 mb-4">
                    Embark on Adventures with Orbit Travels
                </Text>
                <Text className="text-gray-950 dark:text-gray-100 text-lg mb-6">
                    Set out on unforgettable journeys with ORBIT Travels, where each adventure is crafted to inspire and thrill. From exotic destinations to hidden gems, our expertly designed itineraries promise unique experiences and seamless travel, ensuring every moment is filled with discovery and wonder.
                </Text>

                <TouchableOpacity onPress={() => router.push("/contact")} className="flex-row items-center bg-blue-600 px-6 py-3 rounded-full shadow-lg self-start">
                    <Text className="text-white font-semibold mr-2">Explore More</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
}
