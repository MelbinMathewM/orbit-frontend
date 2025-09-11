import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useColorScheme } from "react-native";
import { showSuccess, showError } from "../ui/snackBar";
import api from "@/app/axios/axiosInstance";
import CustomTextInput from "../ui/custom-text-input";
import SelectModal from "../ui/select-modal";
import { locationItems, methodItems, vehicleItems, languageItems, daysItems, activityItems } from "@/constants/modal-items";
import SelectField from "../ui/select-field";
import { OutstationModalType } from "@/types/modal";
import { OutstationBookingFormType } from "@/types/form";
import CustomButton from "../ui/custom-button";

const fieldMap: Record<Exclude<OutstationModalType, "locations">, keyof OutstationBookingFormType> = {
    method: "methodContact",
    days: "numberOfDays",
    vehicle: "vehicleType",
    language: "language",
    activities: "activities",
};

export default function OutstationBookingForm() {
    const [form, setForm] = useState<OutstationBookingFormType>({
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

    const [showModal, setShowModal] = useState<{ type: OutstationModalType | null }>({
        type: null,
    });

    const handleChange = (key: keyof OutstationBookingFormType, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };  

    const validateInputs = () => {
        const requiredFields: (keyof OutstationBookingFormType)[] = [
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

        if (form.locations.length < 1) {
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
                <View className="bg-blue-600 py-6 items-center mb-6">
                    <Text className="text-white text-xl font-bold">
                        Outstation Booking
                    </Text>
                </View>

                <View className="px-5 space-y-3">
                    <CustomTextInput label="Full Name" value={form.fullName} onChangeText={(t) => handleChange("fullName", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Email Address" value={form.emailAddress} onChangeText={(t) => handleChange("emailAddress", t)} colorScheme={colorScheme || "light"} keyboardType="email-address" />
                    <CustomTextInput label="Phone Number" value={form.phoneNumber} onChangeText={(t) => handleChange("phoneNumber", t)} colorScheme={colorScheme || "light"} keyboardType="phone-pad" />

                    <SelectField<OutstationModalType> label="Contact Method" value={form.methodContact} type="method" onPress={(type) => setShowModal({ type })} />

                    <CustomTextInput label="Pick Up Location" value={form.pickUp} onChangeText={(t) => handleChange("pickUp", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Drop Off Location" value={form.dropOff} onChangeText={(t) => handleChange("dropOff", t)} colorScheme={colorScheme || "light"} />

                    <Text className="font-medium mt-3 mb-2 text-gray-700 dark:text-gray-300">
                        Select Number of Passengers
                    </Text>
                    <View className="flex-row space-x-4">
                        <View className="flex-1 pe-1">
                            <CustomTextInput label="Adults" value={form.adultNumber} onChangeText={(t) => handleChange("adultNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                        </View>
                        <View className="flex-1 pe-1">
                            <CustomTextInput label="Children (2 - 12)" value={form.childNumber} onChangeText={(t) => handleChange("childNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                        </View>
                        <View className="flex-1">
                            <CustomTextInput label="Infants ( < 2)" value={form.infantNumber} onChangeText={(t) => handleChange("infantNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                        </View>
                    </View>

                    <SelectField<OutstationModalType> label="NUmber of days" value={form.numberOfDays} type="days" onPress={(type) => setShowModal({ type })} />
                    <SelectField<OutstationModalType> label="Vehicle Type" value={form.vehicleType} type="vehicle" onPress={(type) => setShowModal({ type })} />
                    <SelectField<OutstationModalType> label="Language" value={form.language} type="language" onPress={(type) => setShowModal({ type })} />
                    <SelectField<OutstationModalType> label="Locations" value={form.locations} type="locations" onPress={(type) => setShowModal({ type })} />
                    <SelectField<OutstationModalType> label="Activities & Interests" value={form.activities} type="activities" onPress={(type) => setShowModal({ type })} />

                    <CustomTextInput label="Budget" value={form.budget as string} onChangeText={(t) => handleChange("budget", t)} colorScheme={colorScheme || "light"} keyboardType="numeric" />
                    <CustomTextInput label="Additional Requirements" value={form.additionalRequirements} onChangeText={(t) => handleChange("additionalRequirements", t)}
                        colorScheme={colorScheme} multiline numberOfLines={4} style={{ marginBottom: 12, height: 120 }}
                    />

                    <CustomButton label="Submit" onPress={handleSubmit}
                        loading={loading} colorScheme={colorScheme}
                    />
                </View>
            </ScrollView>

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