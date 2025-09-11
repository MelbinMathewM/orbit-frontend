import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeExclusive() {
    const rating = 4.2;
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    return (
        <View className="px-4 py-8 bg-white dark:bg-gray-950">
            <Text className="text-3xl font-bold mt-2 text-gray-900 dark:text-white mb-2 text-center">
                Our Exclusive Packages
            </Text>
            <Text className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                Checkout Our Exclusive Packages Below
            </Text>

            <View className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 w-full">
                <View className="rounded-lg overflow-hidden mb-4">
                    <Image
                        source={require("../../../assets/images/home-hero1.jpeg")}
                        style={{ width: "100%", height: 180 }}
                        resizeMode="cover"
                    />
                </View>

                <View className="px-2">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Wellness Programme
                    </Text>

                    <View className="flex-row items-center mb-2">
                        {Array.from({ length: fullStars }).map((_, idx) => (
                            <Ionicons key={idx} name="star" size={20} color="#FBBF24" />
                        ))}
                        {halfStar && <Ionicons name="star-half" size={20} color="#FBBF24" />}
                        <Text className="ml-2 text-gray-700 dark:text-gray-300">{rating}/5</Text>
                    </View>

                    <Text className="text-gray-700 dark:text-gray-300">
                        We provide exclusive wellness packages for our valuable customers.
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push("/contact")}
                        className="bg-orange-500 mt-3 px-4 py-2 rounded-xl items-center flex-row justify-center shadow-lg self-start"
                    >
                        <Text className="text-white font-semibold text-lg mr-2">Contact Now</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}