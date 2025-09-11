import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { RelativePathString, useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";

const options = [
    {
        title: "Flight Enquiry",
        description: "Check flights, schedules, and pricing for your trips.",
        icon: <FontAwesome5 name="plane-departure" size={28} color="white" />,
        route: "/admin/booking/flight-enquiries",
        color: "#3b82f6",
    },
    {
        title: "Hotel Booking",
        description: "Find and book hotels at your destination.",
        icon: <Ionicons name="bed-outline" size={28} color="white" />,
        route: "/admin/booking/hotel-bookings",
        color: "#f97316",
    },
    {
        title: "Outstation Booking",
        description: "Plan long-distance trips with comfort and convenience.",
        icon: <FontAwesome5 name="car-side" size={28} color="white" />,
        route: "/admin/booking/outstation-bookings",
        color: "#10b981",
    },
    {
        title: "Day Tour Enquiry",
        description: "Explore local attractions with guided day tours.",
        icon: <Entypo name="map" size={28} color="white" />,
        route: "/admin/booking/day-tour-enquiries",
        color: "#8b5cf6",
    },
    {
        title: "Special Package",
        description: "Exclusive travel packages for your holidays.",
        icon: <MaterialCommunityIcons name="gift" size={28} color="white" />,
        route: "/admin/booking/special-packages",
        color: "#f43f5e",
    },
    {
        title: "Wellness Package",
        description: "Relax and rejuvenate with wellness packages.",
        icon: <MaterialCommunityIcons name="spa" size={28} color="white" />,
        route: "/admin/booking/wellness-package",
        color: "#facc15",
    },
] as const;

type BookingOption = typeof options[number];

export default function BookingScreen() {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">
            {/* Header */}
            <Text className="text-3xl font-bold p-6 text-center text-gray-900 dark:text-gray-200">
                Bookings
            </Text>
            
            {/* Cards */}
            <View className="flex-row flex-wrap justify-between">
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.title}
                        onPress={() => router.push(option.route as RelativePathString)}
                        className="w-full sm:w-[48%] bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 mb-4 flex-row items-center"
                    >
                        {/* Icon on left */}
                        <View
                            className="w-14 h-14 rounded-full items-center justify-center mr-4"
                            style={{ backgroundColor: option.color }}
                        >
                            {option.icon}
                        </View>

                        {/* Text */}
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-gray-900 dark:text-gray-300 mb-1">
                                {option.title}
                            </Text>
                            <Text className="text-gray-600 dark:text-gray-400 text-sm">
                                {option.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

        </ScrollView>
    );
}
