import React from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const airplane_img = require("../../assets/images/services-airplane.jpg");
const wedding_img = require("../../assets/images/services-wedding.jpg");
const tour_img = require("../../assets/images/services-tour.jpg");
const sight_img = require("../../assets/images/services-sight.jpg");
const pilgrim_img = require("../../assets/images/services-pilgrim.jpg");

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
        <View className="bg-gray-50 py-8 px-4 w-full">
            <View className="items-center w-full">
                {/* Title */}
                <Text className="text-3xl font-bold text-gray-900 mb-4 text-center">
                    Our Services
                </Text>

                {/* Subtitle */}
                <Text className="text-gray-600 mb-6 text-center max-w-md">
                    ORBIT Travels is committed to creating exceptional travel
                    experiences, ensuring comfort, elegance, and unforgettable moments.
                </Text>

                {/* Cards stacked for phone */}
                {services.map((service, index) => (
                    <View
                        key={index}
                        className="bg-white rounded-xl mb-6 w-full max-w-md overflow-hidden"
                        style={{
                            shadowColor: "#3b82f3",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 6,
                            elevation: 6,
                        }}
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
                            <Text className="text-xl font-semibold text-gray-800 mb-2">
                                {service.title}
                            </Text>
                            <Text className="text-gray-600 mb-4">{service.description}</Text>

                            {/* Contact Button */}
                            <View style={{ width: 120}}>
                                <Pressable
                                    onPress={() => alert(`Contact for ${service.title}`)}
                                    className="flex flex-row items-center bg-blue-600 py-3 px-4 rounded-xl"
                                    android_ripple={{ color: "#2563eb" }}
                                >
                                    <Text className="text-white text-center font-medium">
                                        Contact Us{'   '}
                                    </Text>
                                    <Ionicons name="call" size={14} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
