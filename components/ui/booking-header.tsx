import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";

type PageHeaderProps = {
    title: string;
    backRoute?: string;
};

export default function BookingHeader({ title, backRoute = "/booking" }: PageHeaderProps) {
    return (
        <View className="bg-orange-500 py-6 px-4 flex-row items-center mb-6">
            <TouchableOpacity onPress={() => router.push(backRoute as RelativePathString)} className="mr-3">
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-xl font-bold flex-1 text-center">
                {title}
            </Text>

            <View style={{ width: 24 }} />
        </View>
    );
}
