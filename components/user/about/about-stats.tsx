import React from "react";
import { View, Text } from "react-native";

const stats = [
    { value: "20", label: "Years of Experience" },
    { value: "2,450", label: "Happy Customers" },
    { value: "1,250", label: "Professional Guides" },
    { value: "250", label: "Top Destinations" },
];

export default function AboutStats() {
    return (
        <View className="bg-white dark:bg-gray-950 py-10 px-6">
            <View className="flex-row flex-wrap justify-between">
                {stats.map((stat, index) => (
                    <View
                        key={index}
                        className="w-[48%] rounded-lg p-5 mb-4 items-center justify-center"
                    >
                        <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                            {stat.value}<Text className="text-orange-200">+</Text>
                        </Text>
                        <Text className="text-base text-gray-700 dark:text-gray-300 text-center">
                            {stat.label}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
