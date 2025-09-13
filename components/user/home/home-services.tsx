import React from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const airplane_img = require("../../../assets/images/services-airplane.jpg");
const wedding_img = require("../../../assets/images/services-wedding.jpg");
const tour_img = require("../../../assets/images/services-tour.jpg");
const sight_img = require("../../../assets/images/services-sight.jpg");
const pilgrim_img = require("../../../assets/images/services-pilgrim.jpg");

const services = [
    {
        title: "Airport Transportation",
        description:
            "Enjoy a seamless journey with our reliable coordinators and drivers, whether from the airport to your destination or vice versa.",
        image: airplane_img,
    },
    {
        title: "Wedding Transportation",
        description:
            "Make your day unforgettable with our premium wedding transportation. Our elegant vehicles ensure you and your guests arrive in style and comfort.",
        image: wedding_img,
    },
    {
        title: "Holiday Tour Package",
        description:
            "Our packages provide curated itineraries with top attractions and hidden gems. Enjoy smooth travel, comfortable stays, and personalized services.",
        image: tour_img,
    },
    {
        title: "Sight Seeing / Attractions",
        description:
            "Explore your destination with our curated tours highlighting landmarks, culture, and hidden gems for an immersive experience and unforgettable memories.",
        image: sight_img,
    },
    {
        title: "Pilgrims Packages",
        description:
            "Experience a spiritually enriching journey with our pilgrimage packages, offering sacred site visits, comfortable stays, and insightful guidance.",
        image: pilgrim_img,
    },
];

export default function HomeServices() {
    return (
        <View className="bg-gray-50 py-8 px-4 w-full dark:bg-gray-900">
            <View className="items-center w-full">
                <Text className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-4 text-center">
                    Our Services
                </Text>

                <Text className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                    ORBIT Travels is committed to creating exceptional travel
                    experiences, ensuring comfort, elegance, and unforgettable moments.
                </Text>

                {services.map((service, index) => (
                    <View
                        key={index}
                        className="bg-white dark:bg-gray-950 shadow-sm rounded-xl mb-4 w-full max-w-md overflow-hidden"
                    >
                        {/* Image Wrapper */}
                        <View className="w-full aspect-[16/9] overflow-hidden">
                            <Image
                                source={service.image}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>

                        {/* Text Content */}
                        <View className="p-4">
                            <Text className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
                                {service.title}
                            </Text>
                            <Text className="text-gray-600 dark:text-gray-400 mb-4 text-lg">{service.description}</Text>

                            {/* Contact Button */}
                            <TouchableOpacity
                                onPress={() => router.push("/contact")}
                                className="bg-orange-500 dark:bg-orange-500 px-4 py-2 rounded-lg items-center self-start flex-row justify-center shadow-lg"
                            >
                                <Ionicons name="call" size={20} color="white" className="mr-2" />
                                <Text className="text-white font-semibold text-lg">Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
