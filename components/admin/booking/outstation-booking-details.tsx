import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import api from "@/app/axios/axiosInstance";
import { OutstationBookingFormType } from "@/types/form";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import LoadingScreen from "@/components/loading";
import EmptyState from "@/components/empty-state";

export default function OutstationBookingDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [booking, setBooking] = useState<OutstationBookingFormType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await api.get(`/booking/outstation-bookings/${id}`);
                setBooking(response.data.outstationBooking);
            } catch (error) {
                console.error("Error fetching outstation booking:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBooking();
    }, [id]);

    if (loading) {
        return <LoadingScreen />
    }

    if (!booking) {
        return <EmptyState message="Outstation booking not found" />
    }

    return (
        <ScrollView className="flex-1 p-2 bg-gray-50 dark:bg-gray-950">
            <AdminBookingHeader title="Outstation Booking Details" backRoute="/admin/booking/outstation-bookings"/>

            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="car-sport-outline" size={20} /> Trip Details
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Pick-up: <Text className="font-semibold">{booking.pickUp}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Drop-off: <Text className="font-semibold">{booking.dropOff}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Vehicle Type: <Text className="font-semibold">{booking.vehicleType}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Number of Days: <Text className="font-semibold">{booking.numberOfDays}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Language: <Text className="font-semibold">{booking.language}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Budget: <Text className="font-semibold">{booking.budget}</Text>
                </Text>
            </View>

            {/* Guest Info */}
            <View className="bg-violet-500 p-6 rounded-lg shadow-lg mb-3">
                <Text className="text-2xl font-bold text-white">{booking.fullName}</Text>

                {/* Email clickable */}
                <TouchableOpacity
                    onPress={() => Linking.openURL(`mailto:${booking.emailAddress}`)}
                    className="flex-row items-center mt-2"
                >
                    <Ionicons name="mail-outline" size={18} color="#D1FAE5" style={{ marginRight: 6 }} />
                    <Text className="text-green-100 text-base">{booking.emailAddress}</Text>
                </TouchableOpacity>

                {/* Phone clickable */}
                <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${booking.phoneNumber}`)}
                    className="flex-row items-center mt-1"
                >
                    <Ionicons name="call-outline" size={18} color="#D1FAE5" style={{ marginRight: 6 }} />
                    <Text className="text-green-100 text-base">{booking.phoneNumber}</Text>
                </TouchableOpacity>

                <View className="flex-row mt-3 space-x-2">
                    <View className="bg-white/20 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm font-medium">
                            Contact Method: {booking.methodContact}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Guests */}
            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <MaterialIcons name="people" size={20} /> Guests
                </Text>
                <View className="flex-row justify-around px-4">
                    <Text className="text-gray-700 dark:text-gray-300">
                        Adults: <Text className="font-semibold text-lg">{booking.adultNumber || 0}</Text>
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300">
                        Children: <Text className="font-semibold text-lg">{booking.childNumber || 0}</Text>
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300">
                        Infants: <Text className="font-semibold text-lg">{booking.infantNumber || 0}</Text>
                    </Text>
                </View>
            </View>

            {/* Locations & Activities */}
            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="map-outline" size={20} /> Trip Plan
                </Text>
                <View className="mb-2">
                    <Text className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Locations
                    </Text>
                    <View className="flex-row flex-wrap">
                        {booking.locations.map((loc, index) => (
                            <View
                                key={index}
                                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 mr-2 mb-2 rounded-full"
                            >
                                <Text className="text-gray-800 dark:text-gray-200 text-sm">{loc}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Text className="text-gray-700 text-base dark:text-gray-300 mb-1">
                    Activities: <Text className="font-semibold">{booking.activities || "None"}</Text>
                </Text>
            </View>

            {/* Additional Info */}
            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="information-circle-outline" size={20} /> Additional Requirements
                </Text>
                <Text className="text-gray-700 dark:text-gray-300">
                    {booking.additionalRequirements || "None"}
                </Text>
            </View>
        </ScrollView>
    );
}
