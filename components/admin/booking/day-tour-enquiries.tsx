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
import { DayTourEnquiryFormType } from "@/types/form";
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import EmptyState from "@/components/empty-state";
import LoadingScreen from "@/components/loading";

export default function DayTourEnquiries() {
    const router = useRouter();
    const [enquiries, setEnquiries] = useState<DayTourEnquiryFormType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await api.get("/booking/day-tour-enquiries");
                setEnquiries(response.data.dayTourEnquiries || []);
            } catch (error) {
                console.error("Error fetching day tour enquiries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    const renderItem = ({ item }: { item: DayTourEnquiryFormType }) => (
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

            {/* Date & Time */}
            <View className="flex-row flex-wrap mb-3 space-x-2">
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Date: {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Time: {item.time}
                </Text>
            </View>

            {/* Guests */}
            <View className="flex-row flex-wrap mb-3 space-x-2">
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

            {/* Budget */}
            <View className="flex-row flex-wrap mb-3 space-x-2">
                <Text className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Budget: {item.budget}
                </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/admin/booking/day-tour-enquiries/${item._id}` as RelativePathString
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

    if (!loading && enquiries.length === 0) {
        return <EmptyState message="No day tour enquiries found" />
    }

    return (
        <View>
            <AdminBookingHeader title="Day Tour Enquiries" />
            <FlatList
                data={enquiries}
                keyExtractor={(item) => item._id as string}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
