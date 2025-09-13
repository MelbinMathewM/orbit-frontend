import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const services = [
    {
        title: "Airport Transportation",
        description: "Hassle-free airport transfers with reliable and convenient services.",
        icon: <Ionicons name="car-outline" size={28} color="#EA580C" />,
    },
    {
        title: "Hotel Accommodation",
        description: "Relax in top-rated hotels, handpicked for comfort and great locations.",
        icon: <Ionicons name="bed-outline" size={28} color="#EA580C" />,
    },
    {
        title: "Sight Seeing",
        description: "Discover top sights and hidden gems with curated sightseeing tours.",
        icon: <Ionicons name="map-outline" size={28} color="#EA580C" />,
    },
    {
        title: "Flight Tickets",
        description: "Best deals and convenient options for your journey.",
        icon: <Ionicons name="airplane-outline" size={28} color="#EA580C" />,
    },
    {
        title: "Wedding Transportation",
        description: "Stylish and stress-free celebrations with elegant transportation.",
        icon: <MaterialIcons name="celebration" size={28} color="#EA580C" />,
    },
    {
        title: "Holiday Packages",
        description: "Perfect mix of relaxation, adventure, and cultural exploration.",
        icon: <FontAwesome5 name="umbrella-beach" size={24} color="#EA580C" />,
    },
    {
        title: "Shopping Transportation",
        description: "Stress-free trips to shopping destinations with comfort.",
        icon: <Ionicons name="bag-handle-outline" size={28} color="#EA580C" />,
    },
    {
        title: "Pilgrim Packages",
        description: "Comfortable journeys to sacred sites for spiritual fulfillment.",
        icon: <Ionicons name="people-circle-outline" size={28} color="#EA580C" />,
    },
    {
        title: "Bus Tickets",
        description: "Kerala and Bangalore bus tickets at your convenience.",
        icon: <Ionicons name="bus-outline" size={28} color="#EA580C" />,
    },
    {
        title: "Wellness Programme",
        description: "Personalized Ayurvedic treatments for mind, body, and spirit.",
        icon: <Ionicons name="leaf-outline" size={28} color="#EA580C" />,
    },
];

export default function ServicesHero() {
    return (
        <ScrollView className="flex-1 bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <View className="py-8 pb-2 px-4 items-center">
                <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400 text-center mb-3">
                    Why Orbit Travels
                </Text>
                <Text className="text-base dark:text-gray-200 text-indigo-950 text-center leading-relaxed">
                    Orbit Travels stands out for its exceptional service, tailored travel
                    solutions, transparent pricing, 24/7 support, and a focus on your
                    safety and satisfaction. Your trusted partner in exploring the world.
                </Text>
            </View>

            {/* Services Grid */}
            <View className="p-6">
                {services.map((service, index) => (
                    <View
                        key={index}
                        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 flex-row items-start shadow-sm"
                    >
                        {/* Icon */}
                        <View className="mr-4">{service.icon}</View>

                        {/* Text */}
                        <View className="flex-1">
                            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {service.title}
                            </Text>
                            <Text className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {service.description}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
