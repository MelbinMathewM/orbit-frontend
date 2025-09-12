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
import { FlightEnquiryFormType } from "@/types/form";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import LoadingScreen from "@/components/loading";
import EmptyState from "@/components/empty-state";

export default function FlightEnquiryDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [enquiry, setEnquiry] = useState<FlightEnquiryFormType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiry = async () => {
            try {
                const response = await api.get(`/booking/flight-enquiries/${id}`);
                setEnquiry(response.data.flightEnquiry);
            } catch (error) {
                console.error("Error fetching flight enquiry:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEnquiry();
    }, [id]);

    if (loading) {
        return <LoadingScreen />
    }

    if (!enquiry) {
        return <EmptyState message="Flight enquiry not found" />
    }

    return (
        <ScrollView className="flex-1 p-2 bg-gray-50 dark:bg-gray-950">
            <AdminBookingHeader title="Flight Enquiry Details" backRoute="/admin/booking/flight-enquiries" />

            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="airplane" size={18} /> Flight Details
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Airline: <Text className="font-semibold">{enquiry.flightName}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Route:{" "}
                    <Text className="font-semibold">
                        {enquiry.from} ➝ {enquiry.to}
                    </Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Start:{" "}
                    <Text className="font-semibold">
                        {new Date(enquiry.startDate).toLocaleDateString()}
                    </Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    End:{" "}
                    <Text className="font-semibold">
                        {new Date(enquiry.endDate).toLocaleDateString()}
                    </Text>
                </Text>
            </View>

            <View className="bg-violet-500 p-6 rounded-lg shadow-lg mb-3">
                <Text className="text-2xl font-bold text-white">{enquiry.fullName}</Text>

                {/* Email clickable */}
                <TouchableOpacity
                    onPress={() => Linking.openURL(`mailto:${enquiry.emailAddress}`)}
                    className="flex-row items-center mt-2"
                >
                    <Ionicons name="mail-outline" size={18} color="#E0E7FF" style={{ marginRight: 6 }} />
                    <Text className="text-indigo-100 text-base">{enquiry.emailAddress}</Text>
                </TouchableOpacity>

                {/* Phone clickable */}
                <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${enquiry.phoneNumber}`)}
                    className="flex-row items-center mt-1"
                >
                    <Ionicons name="call-outline" size={18} color="#E0E7FF" style={{ marginRight: 6 }} />
                    <Text className="text-indigo-100 text-base">{enquiry.phoneNumber}</Text>
                </TouchableOpacity>

                <View className="flex-row mt-3 space-x-2">
                    <View className="bg-white/20 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm font-medium">
                            {enquiry.tripSelection}
                        </Text>
                    </View>
                    <View className="bg-white/20 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm">
                            Contact Method: <Text className="font-semibold">{enquiry.methodContact}</Text>
                        </Text>
                    </View>
                </View>
            </View>

            {/* Passengers */}
            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <MaterialIcons name="people" size={20} /> Passengers
                </Text>
                <View className="flex-row justify-around px-4">
                    <Text className="text-gray-700 dark:text-gray-300">
                        Adults: <Text className="font-semibold text-lg">{enquiry.adultNumber || 0}</Text>
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300">
                        Children: <Text className="font-semibold text-lg">{enquiry.childNumber || 0}</Text>
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300">
                        Infants: <Text className="font-semibold text-lg">{enquiry.infantNumber || 0}</Text>
                    </Text>
                </View>
            </View>

            {/* Additional Info */}
            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="information-circle" size={20} /> Additional Info
                </Text>
                <Text className="text-gray-700 dark:text-gray-300">
                    Requirements:{" "}
                    <Text className="font-semibold">
                        {enquiry.additionalRequirements || "None"}
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}
