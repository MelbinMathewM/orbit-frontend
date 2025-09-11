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

            <Text className="text-base text-gray-800 dark:text-gray-200 mb-4">
                {item.roomType}{" "} |{"  "}
                Adults: <Text className="font-semibold">{item.adultNumber ?? 0}</Text>,{" "}
                Children: <Text className="font-semibold">{item.childNumber ? item.childNumber : 0}</Text>,{" "}
                Infants: <Text className="font-semibold">{item.infantNumber ? item.infantNumber : 0}</Text>
            </Text>


            {/* Button */}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/admin/booking/hotel-bookings/${item._id}` as RelativePathString
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

    if (!loading && hotelBookings.length === 0) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-gray-600 dark:text-gray-400">
                    No hotel bookings found.
                </Text>
            </View>
        );
    }

    return (
        <View>
            <View className="bg-indigo-600 py-6 items-center mb-6">
                <Text className="text-white text-xl font-bold">Hotel Bookings</Text>
            </View>
            <FlatList
                data={hotelBookings}
                keyExtractor={(item) => item._id as string}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
