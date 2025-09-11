import React from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";

export default function AboutMission() {
    return (
        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }}
            resizeMode="cover"
        >
            {/* Dark Overlay */}
            <View className="bg-black/60 items-center">
                <ScrollView contentContainerStyle={{ paddingVertical: 48, paddingHorizontal: 24 }}>
                    {/* Vision Box */}
                    <View className="bg-white dark:bg-gray-900 p-5 rounded-2xl mb-6 shadow-lg">
                        <Text className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                            Our Vision
                        </Text>
                        <Text className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                            We Orbit Travel & Tours are committed to transforming travel by
                            offering seamless, personalized experiences that connect and inspire
                            people around the globe. We aim to be your top choice for
                            exceptional, stress-free journeys, building a lasting relationship
                            as your trusted travel partner.
                        </Text>
                    </View>

                    {/* Mission Box */}
                    <View className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg">
                        <Text className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                            Our Mission
                        </Text>
                        <Text className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                            At Orbit Travel & Tours, our mission is to deliver exceptional,
                            personalized travel experiences with expert service and innovative
                            solutions. We ensure hassle-free, secure journeys, making every trip
                            seamless and unforgettable.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
