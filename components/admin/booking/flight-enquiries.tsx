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
import { FlightEnquiryFormType } from "@/types/form";
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import LoadingScreen from "@/components/loading";
import EmptyState from "@/components/empty-state";

export default function FlightEnquiries() {
    const router = useRouter();
    const [flightEnquiries, setFlightEnquiries] = useState<
        FlightEnquiryFormType[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await api.get("/booking/flight-enquiries");
                setFlightEnquiries(response.data.flightEnquiries || []);
            } catch (error) {
                console.error("Error fetching flight enquiries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    const renderItem = ({ item }: { item: FlightEnquiryFormType }) => (
        <View className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-lg mb-4 border border-gray-200 dark:border-gray-800">
            {/* Name */}
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {item.fullName}
            </Text>

            {/* Flight & Trip */}
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {item.flightName}
                </Text>
                <Text
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.tripSelection === "roundTrip"
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        }`}
                >
                    {item.tripSelection}
                </Text>
            </View>

            {/* Route */}
            <Text className="text-base text-gray-800 dark:text-gray-200 mb-2">
                {item.from} ➝ {item.to}
            </Text>

            {/* Dates */}
            <View className="flex-row flex-wrap mb-3">
                <Text className="mr-3 mb-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    Start: {new Date(item.startDate).toLocaleDateString()}
                </Text>
                <Text className="mb-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    End: {new Date(item.endDate).toLocaleDateString()}
                </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/admin/booking/flight-enquiries/${item._id}` as RelativePathString
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

    if (!loading && flightEnquiries.length === 0) {
        return <EmptyState message="No flight enquiries found" />
    }

    return (
        <View>
            <AdminBookingHeader title="Flight Enquiries" />

            <FlatList
                data={flightEnquiries}
                keyExtractor={(item) => item._id as string}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
