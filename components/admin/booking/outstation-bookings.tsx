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
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import LoadingScreen from "@/components/loading";
import EmptyState from "@/components/empty-state";

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
                <Text className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
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
                className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 rounded-lg py-3"
            >
                <Text className="text-white text-center font-semibold text-base">
                    View Details
                </Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <LoadingScreen />
    }

    if (!loading && bookings.length === 0) {
        return <EmptyState message="No outstation bookings found." />
    }

    return (
        <View>
            <AdminBookingHeader title="Outstation Bookings" />
            <FlatList
                data={bookings}
                keyExtractor={(item) => item._id as string}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
