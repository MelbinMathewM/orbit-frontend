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
import { HotelBookingFormType } from "@/types/form";
import { Ionicons } from "@expo/vector-icons";
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import LoadingScreen from "@/components/loading";
import EmptyState from "@/components/empty-state";

export default function HotelBookings() {
    const router = useRouter();
    const [hotelBookings, setHotelBookings] = useState<HotelBookingFormType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get("/booking/hotel-bookings");
                setHotelBookings(response.data.hotelBookings || []);
            } catch (error) {
                console.error("Error fetching hotel bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const renderItem = ({ item }: { item: HotelBookingFormType }) => (
        <View className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-lg mb-4 border border-gray-200 dark:border-gray-800">
            {/* Name */}
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {item.fullName}
            </Text>

            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {item.accommodationType}
                </Text>
                <Text className="flex-row items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                    <Ionicons name="star" size={12} color="#facc15" />{" "}
                    {item.starRating.split(" ")[0]} {item.starRating.split(" ")[1].charAt(0).toUpperCase() + item.starRating.split(" ")[1].slice(1)}
                </Text>
            </View>

            <Text className="flex-row flex-wrap mb-3 space-x-2">
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Room: {item.roomType}
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
            </Text>


            {/* Button */}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/admin/booking/hotel-bookings/${item._id}` as RelativePathString
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

    if (!loading && hotelBookings.length === 0) {
        return <EmptyState message="No hotel bookings found" />
    }

    return (
        <View>
            <AdminBookingHeader title="Hotel Bookings" />
            <FlatList
                data={hotelBookings}
                keyExtractor={(item) => item._id as string}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
