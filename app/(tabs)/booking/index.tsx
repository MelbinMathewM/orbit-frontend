// pages/Booking.tsx
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { JSX } from "react";

const options = [
  {
    title: "Flight Enquiry",
    description: "Check flights, schedules, and pricing for your trips.",
    icon: <FontAwesome5 name="plane-departure" size={28} color="white" />,
    route: "/booking/flight-enquiry",
    color: "#3b82f6",
  },
  {
    title: "Hotel Booking",
    description: "Find and book hotels at your destination.",
    icon: <Ionicons name="bed-outline" size={28} color="white" />,
    route: "/booking/hotel-booking",
    color: "#f97316",
  },
  {
    title: "Outstation Booking",
    description: "Plan long-distance trips with comfort and convenience.",
    icon: <FontAwesome5 name="car-side" size={28} color="white" />,
    route: "/booking/outstation-booking",
    color: "#10b981",
  },
  {
    title: "Day Tour Enquiry",
    description: "Explore local attractions with guided day tours.",
    icon: <Entypo name="map" size={28} color="white" />,
    route: "/booking/day-tour-enquiry",
    color: "#8b5cf6",
  },
  {
    title: "Special Package",
    description: "Exclusive travel packages for your holidays.",
    icon: <MaterialCommunityIcons name="gift" size={28} color="white" />,
    route: "/booking/special-package",
    color: "#f43f5e",
  },
  {
    title: "Wellness Package",
    description: "Relax and rejuvenate with wellness packages.",
    icon: <MaterialCommunityIcons name="spa" size={28} color="white" />,
    route: "/booking/wellness-package",
    color: "#facc15",
  },
] as const;

type BookingOption = typeof options[number];

export default function BookingScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <Text className="text-3xl font-bold p-4 text-center text-gray-900">
        Explore Our Booking Options
      </Text>
      <Text className="text-gray-700 mb-6 text-center px-2">
        Choose from flights, hotels, tours, and exclusive packages to plan your perfect trip with ORBIT Travel & Tours.
      </Text>

      {/* Cards */}
      <View className="flex-row flex-wrap justify-between">
        {options.map((option) => (
          <TouchableOpacity
            key={option.title}
            onPress={() => router.push(option.route)}
            className="w-full sm:w-[48%] bg-white rounded-2xl shadow-md p-4 mb-4 flex-row items-center"
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
              <Text className="text-lg font-bold text-gray-900 mb-1">
                {option.title}
              </Text>
              <Text className="text-gray-600 text-sm">
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}
