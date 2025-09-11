import React, { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "expo-image";
import { showSuccess, showError } from "../ui/snackBar";
import { useColorScheme } from "react-native";
import api from "@/app/axios/axiosInstance";
import SelectModal from "../ui/select-modal";
import { methodItems, flightItems, tripItems } from "@/constants/modal-items";
import SelectField from "../ui/select-field";
import CustomTextInput from "../ui/custom-text-input";
import CustomDateInput from "../ui/custom-date-input";
import { FlightEnquiryFormType } from "@/types/form";
import { FlightModalType } from "@/types/modal";
import CustomButton from "../ui/custom-button";

const flight_img = require("../../assets/images/flight.jpg");

const fieldMap: Record<FlightModalType, keyof FlightEnquiryFormType> = {
    method: "methodContact",
    flight: "flightName",
    trip: "tripSelection"
};

export default function FlightEnquiry() {
    const [form, setForm] = useState<FlightEnquiryFormType>({
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
        type: FlightModalType | null;
    }>({ type: null });

    const handleChange = (key: keyof FlightEnquiryFormType, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateInputs = () => {
        const requiredFields: (keyof FlightEnquiryFormType)[] = [
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
                <View className="bg-blue-600 py-6 items-center mb-6">
                    <Text className="text-white text-xl font-bold">Flight Enquiry</Text>
                </View>

                <Image
                    source={require("../../assets/images/flight.jpg")}
                    className="w-full h-48 rounded-xl mb-8"
                    contentFit="cover"
                />

                <View className="px-5 space-y-5">
                    <CustomTextInput label="Full Name" value={form.fullName} onChangeText={(t) => handleChange("fullName", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Email Address" value={form.emailAddress} onChangeText={(t) => handleChange("emailAddress", t)} colorScheme={colorScheme || "light"} keyboardType="email-address" />
                    <CustomTextInput label="Phone Number" value={form.phoneNumber} onChangeText={(t) => handleChange("phoneNumber", t)} colorScheme={colorScheme || "light"} keyboardType="phone-pad" />

                    <SelectField<FlightModalType> label="Contact Method" value={form.methodContact} type="method" onPress={(type) => setShowModal({ type })} />
                    <SelectField<FlightModalType> label="Flight" value={form.flightName} type="flight" onPress={(type) => setShowModal({ type })} />
                    <SelectField<FlightModalType> label="Trip Type" value={form.tripSelection} type="trip" onPress={(type) => setShowModal({ type })} />

                    <View className="flex-row space-x-4 pb-2 pt-1">
                        <View className="flex-1 pe-2">
                            <CustomTextInput label="From" value={form.from} onChangeText={(t) => handleChange("from", t)} colorScheme={colorScheme || "light"} />
                        </View>
                        <View className="flex-1">
                            <CustomTextInput label="To" value={form.to} onChangeText={(t) => handleChange("to", t)} colorScheme={colorScheme || "light"} />
                        </View>
                    </View>

                    <View className="flex flex-col">
                        <CustomDateInput label="Departure Date" value={form.startDate as Date}
                            onChange={(d) => handleChange("startDate", d)} colorScheme={colorScheme}
                        />

                        <CustomDateInput label="Return Date" value={form.endDate as Date}
                            onChange={(d) => handleChange("endDate", d)} colorScheme={colorScheme} inputMode="end"
                        />
                    </View>

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
                    showModal.type
                        ? (form[fieldMap[showModal.type]] as string)
                        : ""
                }
                onClose={() => setShowModal({ type: null })}
                onSelect={(value) => {
                    if (showModal.type) {
                        handleChange(fieldMap[showModal.type], value);
                        setShowModal({ type: null });
                    }
                }}
            />
        </KeyboardAvoidingView>
    );
}
