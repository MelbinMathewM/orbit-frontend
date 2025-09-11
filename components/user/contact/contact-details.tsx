import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function ContactDetails() {
    return (
        <View className="py-12 px-6 bg-white dark:bg-gray-950">
            {/* Header */}
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Get in Touch
            </Text>
            <Text className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Don't hesitate to contact us
            </Text>

            {/* Phone Section */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="call" size={24} color="#2563EB" className="mr-2" />
                <Text className="text-xl font-semibold text-gray-900 dark:text-white">Phone</Text>
            </View>
            <View className="ml-10 mb-6">
                {[
                    "+91 8431216532",
                    "+91 9986821915",
                    "+91 9447787507",
                    "+971 502682540 (UAE)",
                ].map((phone, idx) => (
                    <TouchableOpacity key={idx} onPress={() => Linking.openURL(`tel:${phone}`)} className="mb-2">
                        <Text className="text-gray-700 dark:text-gray-300 text-lg">{phone}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Email Section */}
            <View className="flex-row items-center mb-3">
                <MaterialIcons name="email" size={24} color="#2563EB" className="mr-2" />
                <Text className="text-xl font-semibold text-gray-900 dark:text-white">Email</Text>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:info@orbit-travels.com")} className="ml-10 mb-6">
                <Text className="text-gray-700 dark:text-gray-300 text-lg">info@orbit-travels.com</Text>
            </TouchableOpacity>

            {/* Address Section */}
            <View className="flex-col items-start">
                <View className="flex-row items-center mb-3">
                    <Entypo name="location-pin" size={24} color="#2563EB" className="mr-2 mt-1" />
                    <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Address</Text>
                </View>
                    <Text className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed ml-10">
                        Number 47, 1st Floor, Aruna Complex,{"\n" }
                        Church Block, Vishwanatha Nagenahalli,{"\n"}
                        RT Nagar, Bengaluru-560032
                    </Text>
            </View>
        </View>
    );
}
