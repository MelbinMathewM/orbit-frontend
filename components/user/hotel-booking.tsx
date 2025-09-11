import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { showSuccess, showError } from "../ui/snackBar";
import { useColorScheme } from "react-native";
import api from "@/app/axios/axiosInstance";
import { methodItems, accommodationItems, starRatingItems } from "@/constants/modal-items";
import SelectModal from "../ui/select-modal";
import SelectField from "../ui/select-field";
import CustomTextInput from "../ui/custom-text-input";
import { HotelBookingFormType } from "@/types/form";
import { HotelModalType } from "@/types/modal";
import CustomRadioGroup from "../ui/custom-radio-group";
import CustomButton from "../ui/custom-button";

const fieldMap: Record<HotelModalType, keyof HotelBookingFormType> = {
    method: "methodContact",
    accommodation: "accommodationType",
    star: "starRating"
};

export default function HotelBooking() {
    const [form, setForm] = useState<HotelBookingFormType>({
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
        type: HotelModalType | null;
    }>({ type: null });

    const roomTypes = ["Single Room", "Double Room", "Suite Room", "Family Room"];

    const handleChange = (key: keyof HotelBookingFormType, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateInputs = () => {
        const requiredFields: (keyof HotelBookingFormType)[] = [
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

    const getItems = () => {
        switch (showModal.type) {
            case "method":
                return methodItems;
            case "accommodation":
                return accommodationItems;
            case "star":
                return starRatingItems;
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
                    <Text className="text-white text-xl font-bold">Hotel Booking</Text>
                </View>

                <View className="px-5 space-y-5">
                    <CustomTextInput label="Full Name" value={form.fullName} onChangeText={(t) => handleChange("fullName", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Email Address" value={form.emailAddress} onChangeText={(t) => handleChange("emailAddress", t)} colorScheme={colorScheme || "light"} keyboardType="email-address" />
                    <CustomTextInput label="Phone Number" value={form.phoneNumber} onChangeText={(t) => handleChange("phoneNumber", t)} colorScheme={colorScheme || "light"} keyboardType="phone-pad" />

                    <SelectField<HotelModalType> label="Contact Method" value={form.methodContact} type="method" onPress={(type) => setShowModal({ type })} />
                    <SelectField<HotelModalType> label="Accommodation Type" value={form.accommodationType} type="accommodation" onPress={(type) => setShowModal({ type })} />
                    <SelectField<HotelModalType> label="Star Rating" value={form.starRating} type="star" onPress={(type) => setShowModal({ type })} />

                    <CustomRadioGroup label="Room Type" options={roomTypes} value={form.roomType}
                        onChange={(room) => handleChange("roomType", room)} colorScheme={colorScheme}
                    />

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
