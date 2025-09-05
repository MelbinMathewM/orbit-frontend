import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useColorScheme } from "react-native";
import { showSuccess, showError } from "../ui/snackBar";
import api from "@/app/axios/axiosInstance";
import CustomTextInput from "../ui/custom-text-input";
import SelectModal from "../ui/select-modal";
import { locationItems, methodItems, vehicleItems, languageItems, daysItems, activityItems } from "@/constants/modal-items";

interface OutstationBookingForm {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    pickUp: string;
    dropOff: string;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    numberOfDays: string;
    vehicleType: string;
    language: string;
    locations: string[];
    activities: string;
    budget: string | number;
    additionalRequirements: string;
}

type ModalType =
    | "method"
    | "days"
    | "vehicle"
    | "language"
    | "locations"
    | "activities";

const fieldMap: Record<Exclude<ModalType, "locations">, keyof OutstationBookingForm> = {
    method: "methodContact",
    days: "numberOfDays",
    vehicle: "vehicleType",
    language: "language",
    activities: "activities",
};

export default function OutstationBookingForm() {
    const [form, setForm] = useState<OutstationBookingForm>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        methodContact: "",
        pickUp: "",
        dropOff: "",
        adultNumber: "",
        childNumber: "",
        infantNumber: "",
        numberOfDays: "",
        vehicleType: "",
        language: "",
        locations: [],
        activities: "",
        budget: "",
        additionalRequirements: "",
    });

    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();

    const [showModal, setShowModal] = useState<{ type: ModalType | null }>({
        type: null,
    });

    const handleChange = (key: keyof OutstationBookingForm, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateInputs = () => {
        const requiredFields: (keyof OutstationBookingForm)[] = [
            "fullName",
            "emailAddress",
            "phoneNumber",
            "methodContact",
            "pickUp",
            "dropOff",
            "adultNumber",
            "numberOfDays",
            "vehicleType",
            "language",
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

        if(form.locations.length < 1) {
            showError("At least 1 location is required");
            return false;
        }

        if (Number(form.budget) < 0) {
            showError("Give a valid budget");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;
        try {
            const payload = {
                ...form,
                budget: Number(form.budget),
            };
            setLoading(true);
            const response = await api.post("/booking/outstation-booking", { payload });
            if (response.status === 201) {
                showSuccess("Outstation booking submitted successfully");
                setForm({
                    fullName: "",
                    emailAddress: "",
                    phoneNumber: "",
                    methodContact: "",
                    pickUp: "",
                    dropOff: "",
                    adultNumber: "",
                    childNumber: "",
                    infantNumber: "",
                    numberOfDays: "",
                    vehicleType: "",
                    language: "",
                    locations: [],
                    activities: "",
                    budget: "",
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

    const renderSelect = (label: string, value: string | string[], type: ModalType) => {
        const isArray = Array.isArray(value);

        return (
            <TouchableOpacity
                onPress={() => setShowModal({ type })}
                className="border border-gray-300 dark:border-gray-800 rounded-md mb-4 px-4 py-3 bg-white dark:bg-gray-900 shadow-sm"
            >
                {isArray ? (
                    value.length > 0 ? (
                        <View>
                            <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                {label}
                            </Text>
                            <View className="flex-row flex-wrap">
                                {value.map((loc, index) => (
                                    <View
                                        key={index}
                                        className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md mr-2 mb-2"
                                    >
                                        <Text className="text-sm text-gray-800 dark:text-gray-100">
                                            {loc}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <Text className="text-gray-400">{`Select ${label}`}</Text>
                    )
                ) : value ? (
                    <View>
                        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {label}
                        </Text>
                        <Text className="text-gray-900 dark:text-gray-100">{value}</Text>
                    </View>
                ) : (
                    <Text className="text-gray-400">{`Select ${label}`}</Text>
                )}
            </TouchableOpacity>
        );
    };

    const getItems = () => {
        switch (showModal.type) {
            case "method":
                return methodItems;
            case "days":
                return daysItems;
            case "vehicle":
                return vehicleItems;
            case "language":
                return languageItems;
            case "locations":
                return locationItems;
            case "activities":
                return activityItems;
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
                    <Text className="text-white text-xl font-bold">
                        Outstation Booking
                    </Text>
                </View>

                {/* Form */}
                <View className="px-5 space-y-3">
                    <CustomTextInput label="Full Name" value={form.fullName} onChangeText={(t) => handleChange("fullName", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Email Address" value={form.emailAddress} onChangeText={(t) => handleChange("emailAddress", t)} colorScheme={colorScheme || "light"} keyboardType="email-address" />
                    <CustomTextInput label="Phone Number" value={form.phoneNumber} onChangeText={(t) => handleChange("phoneNumber", t)} colorScheme={colorScheme || "light"} keyboardType="phone-pad" />

                    {renderSelect("Contact Method", form.methodContact, "method")}
                    <CustomTextInput label="Pick Up Location" value={form.pickUp} onChangeText={(t) => handleChange("pickUp", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Drop Off Location" value={form.dropOff} onChangeText={(t) => handleChange("dropOff", t)} colorScheme={colorScheme || "light"} />

                    {/* Passenger Counts */}
                    <Text className="font-medium mt-3 mb-2 text-gray-700 dark:text-gray-300">
                        Select Number of Passengers
                    </Text>
                    <View className="flex-row space-x-4">
                        <CustomTextInput label="Adults" value={form.adultNumber} onChangeText={(t) => handleChange("adultNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                        <CustomTextInput label="Children" value={form.childNumber} onChangeText={(t) => handleChange("childNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                        <CustomTextInput label="Infants" value={form.infantNumber} onChangeText={(t) => handleChange("infantNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                    </View>

                    {renderSelect("Number of Days", form.numberOfDays, "days")}
                    {renderSelect("Vehicle Type", form.vehicleType, "vehicle")}
                    {renderSelect("Language", form.language, "language")}
                    {renderSelect("Locations", form.locations, "locations")}
                    {renderSelect("Activities & Interests", form.activities, "activities")}

                    <CustomTextInput label="Budget" value={form.budget as string} onChangeText={(t) => handleChange("budget", t)} colorScheme={colorScheme || "light"} keyboardType="numeric" />
                    <TextInput
                        mode="outlined"
                        label="Additional Requirements"
                        value={form.additionalRequirements}
                        onChangeText={(t) => handleChange("additionalRequirements", t)}
                        multiline
                        numberOfLines={4}
                        style={{
                            marginBottom: 12,
                            backgroundColor: colorScheme === "dark" ? "#1e2022ff" : "#fcfcfcff",
                        }}
                        outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
                        activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                        textColor={colorScheme === "dark" ? "white" : "black"}
                        theme={{ roundness: 8 }}
                    />

                    <TouchableOpacity
                        className="mt-2 bg-blue-600 py-4 rounded-md items-center shadow-md"
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text className="text-white font-semibold">Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal */}
            <SelectModal
                visible={!!showModal.type}
                type={showModal.type}
                items={getItems()}
                selectedValues={
                    showModal.type === "locations"
                        ? form.locations
                        : showModal.type
                            ? [form[fieldMap[showModal.type]] as string]
                            : []
                }
                onClose={() => setShowModal({ type: null })}
                onSelect={(value) => {
                    if (showModal.type === "locations") {
                        if (form.locations.includes(value)) {
                            handleChange(
                                "locations",
                                form.locations.filter((loc) => loc !== value)
                            );
                        } else {
                            handleChange("locations", [...form.locations, value]);
                        }
                    } else if (showModal.type) {
                        const formKey = fieldMap[showModal.type];
                        handleChange(formKey, value);
                        setShowModal({ type: null });
                    }
                }}
            />
        </KeyboardAvoidingView>
    );
}
