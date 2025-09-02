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
import { Image } from "expo-image";
import { DatePickerInput } from "react-native-paper-dates";
import { showSuccess, showError } from "../ui/snackBar";
import { useColorScheme } from "react-native";
import api from "@/app/axios/axiosInstance";

const flight_img = require("../../assets/images/flight.jpg");

interface FlightEnquiryForm {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    flightName: string;
    tripSelection: string;
    from: string;
    to: string;
    startDate: string | Date;
    endDate: string | Date;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    additionalRequirements: string;
}

export default function FlightEnquiry() {
    const [form, setForm] = useState<FlightEnquiryForm>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        methodContact: "",
        flightName: "",
        tripSelection: "",
        from: "",
        to: "",
        startDate: "",
        endDate: "",
        adultNumber: "",
        childNumber: "",
        infantNumber: "",
        additionalRequirements: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const colorScheme = useColorScheme();

    const [showModal, setShowModal] = useState<{
        type: "trip" | "flight" | "method" | null;
    }>({ type: null });

    const tripItems = [
        { label: "One Way", value: "oneWay" },
        { label: "Round Trip", value: "roundTrip" },
        { label: "Multiple Trip", value: "multipleTrip" },
    ];
    const flightItems = [
        { label: "Emirates", value: "Emirates" },
        { label: "IndiGo", value: "IndiGo" },
        { label: "Qatar Airways", value: "Qatar Airways" },
        { label: "Air India", value: "Air India" },
    ];
    const methodItems = [
        { label: "Phone", value: "Phone" },
        { label: "Email", value: "Email" },
        { label: "WhatsApp", value: "WhatsApp" },
    ];

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateInputs = () => {
        const requiredFields: (keyof FlightEnquiryForm)[] = [
            "fullName",
            "emailAddress",
            "phoneNumber",
            "methodContact",
            "flightName",
            "tripSelection",
            "from",
            "to",
            "startDate",
            "endDate",
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
            const response = await api.post("/booking/flight-enquiry", { form });
            if (response.status === 201) {
                showSuccess("Enquiry submitted successfully");
                setForm({
                    fullName: "",
                    emailAddress: "",
                    phoneNumber: "",
                    methodContact: "",
                    flightName: "",
                    tripSelection: "",
                    from: "",
                    to: "",
                    startDate: "",
                    endDate: "",
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
        type: "trip" | "flight" | "method"
    ) => (
        <TouchableOpacity
            onPress={() => setShowModal({ type })}
            className="border border-gray-300 rounded-md mt-2 px-4 py-4 bg-white shadow-sm"
        >
            <Text className={value ? "text-gray-900" : "text-gray-400"}>
                {value || `Select ${label}`}
            </Text>
        </TouchableOpacity>
    );

    const getItems = () => {
        switch (showModal.type) {
            case "trip":
                return tripItems;
            case "flight":
                return flightItems;
            case "method":
                return methodItems;
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
                    <Text className="text-white text-xl font-bold">Flight Enquiry</Text>
                </View>

                {/* Image */}
                <Image
                    source={flight_img}
                    className="w-full h-48 rounded-xl mb-8"
                    contentFit="cover"
                />

                {/* Form */}
                <View className="px-5 space-y-5">
                    <TextInput
                        mode="outlined"
                        label="Full Name"
                        value={form.fullName}
                        onChangeText={(text) => handleChange("fullName", text)}
                        className={` ${colorScheme === "dark" ? "bg-gray-800" : "bg-white"} rounded-md`}
                        textColor={colorScheme === "dark" ? "white" : "black"}
                    />

                    <TextInput
                        mode="outlined"
                        label="Email Address"
                        keyboardType="email-address"
                        value={form.emailAddress}
                        onChangeText={(text) => handleChange("emailAddress", text)}
                        className="bg-white dark:bg-gray-800 rounded-md"
                        textColor={colorScheme === "dark" ? "white" : "black"}
                    />

                    <TextInput
                        mode="outlined"
                        label="Phone Number"
                        keyboardType="phone-pad"
                        value={form.phoneNumber}
                        onChangeText={(text) => handleChange("phoneNumber", text)}
                        className="bg-white dark:bg-gray-800 rounded-md"
                        textColor={colorScheme === "dark" ? "white" : "black"}
                    />

                    {/* Custom dropdowns */}
                    {renderSelect("Contact Method", form.methodContact, "method")}
                    {renderSelect("Flight", form.flightName, "flight")}
                    {renderSelect("Trip Type", form.tripSelection, "trip")}

                    {/* From / To */}
                    <View className="flex-row space-x-4 pb-2">
                        <View className="flex-1 pe-2">
                            <TextInput
                                mode="outlined"
                                label="From"
                                value={form.from}
                                onChangeText={(text) => handleChange("from", text)}
                                className="bg-white dark:bg-gray-800 rounded-md"
                                textColor={colorScheme === "dark" ? "white" : "black"}
                            />
                        </View>
                        <View className="flex-1">
                            <TextInput
                                mode="outlined"
                                label="To"
                                value={form.to}
                                onChangeText={(text) => handleChange("to", text)}
                                className="bg-white dark:bg-gray-800 rounded-md"
                                textColor={colorScheme === "dark" ? "white" : "black"}
                            />
                        </View>
                    </View>

                    {/* Dates */}
                    <View className="flex flex-col space-y-3">
                        <View style={{ paddingBottom: 6 }}>
                            <DatePickerInput
                                locale="en"
                                label="Departure Date"
                                value={form.startDate as Date}
                                onChange={(d) => handleChange("startDate", d)}
                                inputMode="start"
                                className="bg-white dark:bg-gray-800 rounded-md me-2"
                                textColor={colorScheme === "dark" ? "white" : "black"}
                            />
                        </View>
                        <View>
                            <DatePickerInput
                                locale="en"
                                label="Return Date"
                                value={form.endDate as Date}
                                onChange={(d) => handleChange("endDate", d)}
                                inputMode="start"
                                className="bg-white dark:bg-gray-800 rounded-md"
                                textColor={colorScheme === "dark" ? "white" : "black"}
                            />
                        </View>
                    </View>

                    {/* Passenger counts */}
                    <View className="flex-row space-x-4">
                        <View className="flex-1 pe-2">
                            <TextInput
                                mode="outlined"
                                label="Adults"
                                value={form.adultNumber}
                                onChangeText={(text) => handleChange("adultNumber", text)}
                                keyboardType="numeric"
                                className="bg-white dark:bg-gray-800 rounded-md"
                                textColor={colorScheme === "dark" ? "white" : "black"}
                            />
                        </View>
                        <View className="flex-1 pe-2">
                            <TextInput
                                mode="outlined"
                                label="Children"
                                value={form.childNumber}
                                onChangeText={(text) => handleChange("childNumber", text)}
                                keyboardType="numeric"
                                className="bg-white dark:bg-gray-800 rounded-md"
                                textColor={colorScheme === "dark" ? "white" : "black"}
                            />
                        </View>
                        <View className="flex-1">
                            <TextInput
                                mode="outlined"
                                label="Infants"
                                value={form.infantNumber}
                                onChangeText={(text) => handleChange("infantNumber", text)}
                                keyboardType="numeric"
                                className="bg-white dark:bg-gray-800 rounded-md"
                                textColor={colorScheme === "dark" ? "white" : "black"}
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
                        className="bg-white dark:bg-gray-800 rounded-md"
                        style={{ height: 120 }}
                        textColor={colorScheme === "dark" ? "white" : "black"}
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
                                        if (showModal.type)
                                            handleChange(
                                                showModal.type === "trip"
                                                    ? "tripSelection"
                                                    : showModal.type === "flight"
                                                        ? "flightName"
                                                        : "methodContact",
                                                item.value
                                            );
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
