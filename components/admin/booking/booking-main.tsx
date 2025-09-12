// pages/Booking.tsx
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { RelativePathString, useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { JSX } from "react";

const options = [
    {
        title: "Flight Enquiry",
        description: "Check flights, schedules, and pricing for your trips.",
        icon: <FontAwesome5 name="plane-departure" size={24} color="#7C3AED" />,
        route: "/admin/booking/flight-enquiries",
    },
    {
        title: "Hotel Booking",
        description: "Find and book hotels at your destination.",
        icon: <Ionicons name="bed-outline" size={28} color="#7C3AED" />,
        route: "/admin/booking/hotel-bookings",
    },
    {
        title: "Outstation Booking",
        description: "Plan long-distance trips with comfort and convenience.",
        icon: <FontAwesome5 name="car-side" size={28} color="#7C3AED" />,
        route: "/admin/booking/outstation-bookings",
    },
    {
        title: "Day Tour Enquiry",
        description: "Explore local attractions with guided day tours.",
        icon: <Entypo name="map" size={28} color="#7C3AED" />,
        route: "/admin/booking/day-tour-enquiries",
    },
    {
        title: "Special Package",
        description: "Exclusive travel packages for your holidays.",
        icon: <MaterialCommunityIcons name="gift" size={28} color="#7C3AED" />,
        route: "/admin/booking/special-package",
    },
    {
        title: "Wellness Package",
        description: "Relax and rejuvenate with wellness packages.",
        icon: <MaterialCommunityIcons name="spa" size={28} color="#7C3AED" />,
        route: "/admin/booking/wellness-package",
    },
] as const;


export default function BookingMain() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-950 p-4">
            {/* Header */}
            <Text className="text-2xl font-bold p-6 text-center text-violet-600 dark:text-violet-400">
                Bookings
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 mb-8 text-lg text-center px-2">
                Choose from flights, hotels, tours, and exclusive packages to know about the enquiries and bookings.
            </Text>

            {/* Cards */}
            <View className="flex-row flex-wrap justify-between">
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.title}
                        onPress={() => router.push(option.route as RelativePathString)}
                        className="w-full sm:w-[48%] bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 mb-4 flex-row items-center"
                    >
                        {/* Icon on left */}
                        <View
                            className="w-14 h-14 rounded-full items-center justify-center mr-4"
                        >
                            {option.icon}
                        </View>

                        {/* Text */}
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-1">
                                {option.title}
                            </Text>
                            <Text className="text-gray-600 dark:text-gray-400 text-sm">
                                {option.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
