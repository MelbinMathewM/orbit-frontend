import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { useRouter } from "expo-router";

export default function ServiceCTA() {
    const router = useRouter();
    const { width } = Dimensions.get("window");

    return (
        <ImageBackground
            source={require("../../../assets/images/service-bg.jpg")}
            resizeMode="cover"
            blurRadius={8}
            style={{
                width: "100%",
                height: width,
                justifyContent: "center",
            }}
        >
            {/* Overlay for readability */}
            <View className="flex-1 bg-black/50 px-6 items-center justify-center">
                {/* Heading */}
                <Text className="text-2xl font-bold text-center text-white mb-4">
                    Make your ride Safe,{"\n"}Convenient & Economical.
                </Text>

                {/* Subtext */}
                <Text className="text-lg font-base text-center text-gray-200 dark:text-gray-200 mb-6">
                    Feel free to reach out to Orbit Travels with any questions or for more
                    information. We're here to assist you and ensure your travel experience
                    is exceptional.
                </Text>

                {/* Buttons */}
                <View className="flex-row">
                    <TouchableOpacity
                        onPress={() => router.push("/about")}
                        className="bg-orange-500 px-6 py-3 rounded-lg shadow-lg me-4"
                    >
                        <Text className="text-white font-semibold text-base">About Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/contact")}
                        className="bg-white/90 px-6 py-3 rounded-lg shadow-lg"
                    >
                        <Text className="text-gray-900 font-semibold text-base">
                            Contact Us
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
