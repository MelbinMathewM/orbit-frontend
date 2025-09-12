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
import { DayTourEnquiryFormType } from "@/types/form";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AdminBookingHeader from "@/components/ui/admin-booking-header";
import EmptyState from "@/components/empty-state";
import LoadingScreen from "@/components/loading";

export default function DayTourEnquiryDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [enquiry, setEnquiry] = useState<DayTourEnquiryFormType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiry = async () => {
            try {
                const response = await api.get(`/booking/day-tour-enquiries/${id}`);
                setEnquiry(response.data.dayTourEnquiry);
            } catch (error) {
                console.error("Error fetching day tour enquiry:", error);
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
        return <EmptyState message="Day tour enquiry not found" />
    }

    return (
        <ScrollView className="flex-1 p-2 bg-gray-50 dark:bg-gray-950">
            <AdminBookingHeader title="Day Tour Enquiry Details" backRoute="/admin/booking/day-tour-enquiries" />

            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    <Ionicons name="car-sport-outline" size={20} /> Trip Details
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Pick-up: <Text className="font-semibold">{enquiry.pickUp}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Drop-off: <Text className="font-semibold">{enquiry.dropOff}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Date: <Text className="font-semibold">{new Date(enquiry.date).toLocaleDateString()}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Time: <Text className="font-semibold">{enquiry.time}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Vehicle Type: <Text className="font-semibold">{enquiry.vehicleType}</Text>
                </Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-1 text-base">
                    Budget: <Text className="font-semibold">{enquiry.budget}</Text>
                </Text>
            </View>

            {/* Guest Info */}
            <View className="bg-violet-500 p-6 rounded-lg shadow-lg mb-3">
                <Text className="text-2xl font-bold text-white">{enquiry.fullName}</Text>

                {/* Email */}
                <TouchableOpacity
                    onPress={() => Linking.openURL(`mailto:${enquiry.emailAddress}`)}
                    className="flex-row items-center mt-2"
                >
                    <Ionicons name="mail-outline" size={18} color="#D1E8FF" style={{ marginRight: 6 }} />
                    <Text className="text-blue-100 text-base">{enquiry.emailAddress}</Text>
                </TouchableOpacity>

                {/* Phone */}
                <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${enquiry.phoneNumber}`)}
                    className="flex-row items-center mt-1"
                >
                    <Ionicons name="call-outline" size={18} color="#D1E8FF" style={{ marginRight: 6 }} />
                    <Text className="text-blue-100 text-base">{enquiry.phoneNumber}</Text>
                </TouchableOpacity>

                <View className="flex-row mt-3 space-x-2">
                    <View className="bg-white/20 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm font-medium">
                            Contact Method: {enquiry.methodContact}
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

            {/* Location & Activities */}
            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <Ionicons name="map-outline" size={20} /> Location
                </Text>
                <View className="flex-row flex-wrap">
                    <View className="bg-gray-200 dark:bg-gray-700 px-3 py-1 mr-2 mb-2 rounded-full">
                        <Text className="text-gray-800 dark:text-gray-200 text-sm">{enquiry.location}</Text>
                    </View>
                </View>

                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-3">
                    <Ionicons name="bicycle-outline" size={20} /> Activities
                </Text>
                <View className="flex-row flex-wrap">
                    <View className="bg-gray-200 dark:bg-gray-700 px-3 py-1 mr-2 mb-2 rounded-full">
                        <Text className="text-gray-800 dark:text-gray-200 text-sm">{enquiry.activities}</Text>
                    </View>
                </View>
            </View>

            {/* Additional Requirements */}
            <View className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <Ionicons name="information-circle-outline" size={20} /> Additional Requirements
                </Text>
                <Text className="text-gray-700 dark:text-gray-300">
                    {enquiry.additionalRequirements || "None"}
                </Text>
            </View>
        </ScrollView>
    );
}
