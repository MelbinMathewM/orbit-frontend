import React, { useEffect, useState } from "react";
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { RelativePathString, useRouter } from "expo-router";
import api from "@/app/axios/axiosInstance";
import { OutstationBookingFormType } from "@/types/form";

export default function OutstationBookings() {
    const router = useRouter();
    const [bookings, setBookings] = useState<OutstationBookingFormType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get("/booking/outstation-bookings");
                setBookings(response.data.outstationBookings || []);
            } catch (error) {
                console.error("Error fetching outstation bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const renderItem = ({ item }: { item: OutstationBookingFormType }) => (
        <View className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-lg mb-4 border border-gray-200 dark:border-gray-800">
            {/* Name */}
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {item.fullName}
            </Text>

            {/* Route & Vehicle */}
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {item.pickUp} ➝ {item.dropOff}
                </Text>
                <Text className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                    {item.vehicleType}
                </Text>
            </View>

            {/* Number of Days & Guests */}
            <View className="flex-row flex-wrap mb-3 space-x-2">
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Days: {item.numberOfDays}
                </Text>
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Adults: {item.adultNumber || 0}
                </Text>
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Children: {item.childNumber || 0}
                </Text>
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Infants: {item.infantNumber || 0}
                </Text>
            </View>

            {/* Budget & Language */}
            <View className="flex-row flex-wrap mb-3 space-x-2">
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Budget: {item.budget}
                </Text>
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Language: {item.language}
                </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/admin/booking/outstation-bookings/${item._id}` as RelativePathString
                    )
                }
                className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg py-3"
            >
                <Text className="text-white text-center font-semibold text-base">
                    View Details
                </Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!loading && bookings.length === 0) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-gray-600 dark:text-gray-400">
                    No outstation bookings found.
                </Text>
            </View>
        );
    }

    return (
        <View>
            <View className="bg-indigo-600 py-6 items-center mb-6">
                <Text className="text-white text-xl font-bold">Outstation Bookings</Text>
            </View>
            <FlatList
                data={bookings}
                keyExtractor={(item) => item._id as string}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
