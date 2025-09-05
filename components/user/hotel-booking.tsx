import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Modal,
    FlatList,
} from "react-native";
import { TextInput } from "react-native-paper";
import { showSuccess, showError } from "../ui/snackBar";
import { useColorScheme } from "react-native";
import api from "@/app/axios/axiosInstance";

interface HotelBookingForm {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    accommodationType: string;
    starRating: string;
    roomType: string;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    additionalRequirements: string;
}

export default function HotelBooking() {
    const [form, setForm] = useState<HotelBookingForm>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        methodContact: "",
        accommodationType: "",
        starRating: "",
        roomType: "",
        adultNumber: "",
        childNumber: "",
        infantNumber: "",
        additionalRequirements: "",
    });

    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();

    const [showModal, setShowModal] = useState<{
        type: "method" | "accommodation" | "star" | null;
    }>({ type: null });

    const methodItems = [
        { label: "Phone", value: "Phone" },
        { label: "Email", value: "Email" },
        { label: "WhatsApp", value: "WhatsApp" },
    ];

    const accommodationItems = [
        { label: "Hotel", value: "Hotel" },
        { label: "Resort", value: "Resort" },
        { label: "Villa", value: "Villa" },
        { label: "Appartment", value: "Appartment" },
        { label: "Hostel", value: "Hostel" },
    ];

    const starRatings = [
        { label: "3 Star", value: "3 star" },
        { label: "4 Star", value: "4 star" },
        { label: "5 Star", value: "5 star" },
    ];

    const roomTypes = ["Single Room", "Double Room", "Suite Room", "Family Room"];

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateInputs = () => {
        const requiredFields: (keyof HotelBookingForm)[] = [
            "fullName",
            "emailAddress",
            "phoneNumber",
            "methodContact",
            "accommodationType",
            "starRating",
            "roomType",
            "adultNumber",
        ];

        for (const field of requiredFields) {
            if (!form[field] || String(form[field]).trim() === "") {
                showError(`Please fill in ${field.replace(/([A-Z])/g, " $1")}`);
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.emailAddress)) {
            showError("Please enter a valid email address");
            return false;
        }

        if (Number(form.adultNumber) < 1) {
            showError("At least 1 adult is required");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;
        try {
            setLoading(true);
            console.log("hii", form)
            const response = await api.post("/booking/hotel-booking", { form });
            if (response.status === 201) {
                showSuccess("Hotel booking enquiry submitted successfully");
                setForm({
                    fullName: "",
                    emailAddress: "",
                    phoneNumber: "",
                    methodContact: "",
                    accommodationType: "",
                    starRating: "",
                    roomType: "",
                    adultNumber: "",
                    childNumber: "",
                    infantNumber: "",
                    additionalRequirements: "",
                });
            } else {
                showError("Error submitting form");
            }
        } catch (error) {
            console.error("Error:", error);
            showError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const renderSelect = (
        label: string,
        value: string,
        type: "method" | "accommodation" | "star"
    ) => (
        <TouchableOpacity
            onPress={() => setShowModal({ type })}
            className="border border-gray-300 dark:border-gray-700 rounded-md mb-4 px-4 py-4 bg-white dark:bg-gray-900 shadow-sm"
        >
            <Text className={value ? "text-gray-900 dark:text-gray-200" : "text-gray-400"}>
                {value || `Select ${label}`}
            </Text>
        </TouchableOpacity>
    );

    const getItems = () => {
        switch (showModal.type) {
            case "method":
                return methodItems;
            case "accommodation":
                return accommodationItems;
            case "star":
                return starRatings;
            default:
                return [];
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="bg-blue-600 py-6 items-center mb-6">
                    <Text className="text-white text-xl font-bold">Hotel Booking</Text>
                </View>

                {/* Form */}
                <View className="px-5 space-y-5">
                    <TextInput
                        mode="outlined"
                        label="Full Name"
                        value={form.fullName}
                        onChangeText={(text) => handleChange("fullName", text)}
                        style={{ marginBottom: 12, backgroundColor: colorScheme === "dark" ? "#111827" : "#fcfcfcff" }}
                        outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                        activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                        textColor={colorScheme === "dark" ? "white" : "black"}
                        theme={{
                            roundness: 8,
                        }}
                    />

                    <TextInput
                        mode="outlined"
                        label="Email Address"
                        keyboardType="email-address"
                        value={form.emailAddress}
                        onChangeText={(text) => handleChange("emailAddress", text)}
                        style={{ marginBottom: 12, backgroundColor: colorScheme === "dark" ? "#111827" : "#fcfcfcff" }}
                        outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                        activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                        textColor={colorScheme === "dark" ? "white" : "black"}
                        theme={{
                            roundness: 8,
                        }}
                    />

                    <TextInput
                        mode="outlined"
                        label="Phone Number"
                        keyboardType="phone-pad"
                        value={form.phoneNumber}
                        onChangeText={(text) => handleChange("phoneNumber", text)}
                        style={{ marginBottom: 12, backgroundColor: colorScheme === "dark" ? "#111827" : "#fcfcfcff" }}
                        outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                        activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                        textColor={colorScheme === "dark" ? "white" : "black"}
                        theme={{
                            roundness: 8,
                        }}
                    />

                    {/* Dropdowns */}
                    {renderSelect("Contact Method", form.methodContact, "method")}
                    {renderSelect("Accommodation Type", form.accommodationType, "accommodation")}
                    {renderSelect("Star Rating", form.starRating, "star")}

                    {/* Room Types */}
                    <Text className="font-medium my-3 text-gray-700 dark:text-gray-300">Room Type</Text>
                    {roomTypes.map((room) => {
                        const isSelected = form.roomType === room;
                        return (
                            <TouchableOpacity
                                key={room}
                                className="flex-row items-center mb-3"
                                onPress={() => handleChange("roomType", room)}
                            >
                                <View
                                    className={`w-5 h-5 rounded-full mr-2 border-2 
                                        ${isSelected
                                            ? "border-blue-500 bg-blue-500"
                                            : colorScheme === "dark"
                                                ? "border-gray-500 bg-gray-800"
                                                : "border-gray-400 bg-white"
                                        }`}
                                />
                                <Text className={`${colorScheme === "dark" ? "text-white" : "text-black"}`}>
                                    {room}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}

                    {/* Passenger counts */}
                    <Text className="font-medium mt-3 mb-2 text-gray-700 dark:text-gray-300">Select Number of Passengers</Text>
                    <View className="flex-row space-x-4">
                        <View className="flex-1 pe-2">
                            <TextInput
                                mode="outlined"
                                label="Adults"
                                value={form.adultNumber}
                                onChangeText={(text) => handleChange("adultNumber", text)}
                                keyboardType="numeric"
                                style={{ marginBottom: 12, backgroundColor: colorScheme === "dark" ? "#1e2022ff" : "#fcfcfcff" }}
                                outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                                activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                                textColor={colorScheme === "dark" ? "white" : "black"}
                                theme={{
                                    roundness: 8,
                                }}
                            />
                        </View>
                        <View className="flex-1 pe-2">
                            <TextInput
                                mode="outlined"
                                label="Children"
                                value={form.childNumber}
                                onChangeText={(text) => handleChange("childNumber", text)}
                                keyboardType="numeric"
                                style={{ marginBottom: 12, backgroundColor: colorScheme === "dark" ? "#1e2022ff" : "#fcfcfcff" }}
                                outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                                activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                                textColor={colorScheme === "dark" ? "white" : "black"}
                                theme={{
                                    roundness: 8,
                                }}
                            />
                        </View>
                        <View className="flex-1">
                            <TextInput
                                mode="outlined"
                                label="Infants"
                                value={form.infantNumber}
                                onChangeText={(text) => handleChange("infantNumber", text)}
                                keyboardType="numeric"
                                style={{ marginBottom: 12, backgroundColor: colorScheme === "dark" ? "#1e2022ff" : "#fcfcfcff" }}
                                outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                                activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                                textColor={colorScheme === "dark" ? "white" : "black"}
                                theme={{
                                    roundness: 8,
                                }}
                            />
                        </View>
                    </View>

                    {/* Additional Requirements */}
                    <TextInput
                        mode="outlined"
                        label="Additional Requirements"
                        multiline
                        numberOfLines={4}
                        value={form.additionalRequirements}
                        onChangeText={(text) => handleChange("additionalRequirements", text)}
                        style={{ marginBottom: 12, height: 120, backgroundColor: colorScheme === "dark" ? "#1e2022ff" : "#fcfcfcff" }}
                        outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                        activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                        textColor={colorScheme === "dark" ? "white" : "black"}
                        theme={{
                            roundness: 8,
                        }}
                    />

                    {/* Submit */}
                    <TouchableOpacity
                        className="mt-2 bg-blue-600 py-4 rounded-md items-center shadow-md"
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text className="text-white text-base font-semibold">Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal for dropdowns */}
            <Modal
                visible={!!showModal.type}
                transparent
                animationType="slide"
                onRequestClose={() => setShowModal({ type: null })}
            >
                <View className="flex-1 bg-black/40 justify-end">
                    <View className="bg-white rounded-t-2xl p-5 max-h-[60%]">
                        <Text className="text-lg font-semibold mb-4">Select Option</Text>
                        <FlatList
                            data={getItems()}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (showModal.type) {
                                            handleChange(
                                                showModal.type === "method"
                                                    ? "methodContact"
                                                    : showModal.type === "accommodation"
                                                        ? "accommodationType"
                                                        : "starRating",
                                                item.value
                                            );
                                        }
                                        setShowModal({ type: null });
                                    }}
                                    className="py-4 border-b border-gray-200"
                                >
                                    <Text className="text-gray-700 text-base">{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setShowModal({ type: null })}
                            className="mt-5 bg-gray-200 py-3 rounded-lg items-center"
                        >
                            <Text className="text-gray-700 font-medium">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}
