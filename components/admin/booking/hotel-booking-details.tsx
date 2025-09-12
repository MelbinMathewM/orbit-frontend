import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Linking,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import api from "@/app/axios/axiosInstance";
import { HotelBookingFormType } from "@/types/form";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import LoadingScreen from "@/components/loading";
import EmptyState from "@/components/empty-state";

export default function HotelBookingDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [booking, setBooking] = useState<HotelBookingFormType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await api.get(`/booking/hotel-bookings/${id}`);
                setBooking(response.data.hotelBooking);
            } catch (error) {
                console.error("Error fetching hotel booking:", error);
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
        return <EmptyState message="Hotel booking not found" />
    }

    return (
        <ScrollView className="flex-1 p-2 bg-gray-50 dark:bg-gray-950">
            <AdminBookingHeader title="Hotel Booking Details" backRoute="/admin/booking/hotel-bookings" />

            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="bed-outline" size={18} /> Accommodation Details
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Type: <Text className="font-semibold">{booking.accommodationType}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Star Rating: <Text className="font-semibold">{booking.starRating}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Room Type: <Text className="font-semibold">{booking.roomType}</Text>
                </Text>
            </View>

            <View className="bg-violet-500 p-6 rounded-lg shadow-lg mb-3">
                <Text className="text-2xl font-bold text-white">{booking.fullName}</Text>

                <TouchableOpacity
                    onPress={() => Linking.openURL(`mailto:${booking.emailAddress}`)}
                    className="flex-row items-center mt-2"
                >
                    <Ionicons name="mail-outline" size={18} color="#D1FAE5" style={{ marginRight: 6 }} />
                    <Text className="text-green-100 text-base">{booking.emailAddress}</Text>
                </TouchableOpacity>

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

            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="information-circle-outline" size={20} /> Additional Info
                </Text>
                <Text className="text-gray-700 dark:text-gray-300">
                    Requirements:{" "}
                    <Text className="font-semibold">
                        {booking.additionalRequirements || "None"}
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}
