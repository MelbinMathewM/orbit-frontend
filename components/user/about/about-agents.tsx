import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const agents = [
    {
        name: "Shibu Joseph",
        role: "Managing Director",
        image: require("../../../assets/images/man-icon.jpg"),
    },
    {
        name: "Rekha Santhosh",
        role: "Travel Consultant",
        image: require("../../../assets/images/woman-icon.jpg"),
    },
    {
        name: "Honey Shibu",
        role: "Admin Supervisor",
        image: require("../../../assets/images/woman-icon.jpg"),
    },
    {
        name: "Ajeesh",
        role: "Outstation Planning Specialist",
        image: require("../../../assets/images/man-icon.jpg"),
    },
    {
        name: "Shinoj",
        role: "Daily Tour Specialist",
        image: require("../../../assets/images/man-icon.jpg"),
    },
];

export default function AboutAgents() {
    return (
        <View className="bg-gray-50 dark:bg-gray-900">
            <View className="p-6">
                {/* Heading */}
                <Text className="text-2xl font-heading font-bold text-gray-900 dark:text-white text-center mt-6 mb-4">
                    Meet Our Travel Agents
                </Text>
                <Text className="text-lg font-body text-gray-600 dark:text-gray-300 text-center mb-6">
                    Feel free to reach out to Orbit Travels with any questions or for more
                    information. We're here to assist you and ensure your travel
                    experience is exceptional.
                </Text>

                {/* Agents Grid */}
                <View className="flex-row flex-wrap justify-between">
                    {agents.map((agent, index) => (
                        <View
                            key={index}
                            className="w-[48%] bg-white dark:bg-gray-800 dark:border dark:border-gray-800 rounded-2xl p-4 mb-4 items-center shadow"
                        >
                            <Image
                                source={agent.image}
                                style={{ width: 70, height: 70, borderRadius: 50, marginBottom: 8}}
                            />
                            <Text className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                                {agent.name}
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-300 text-center">
                                {agent.role}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}
