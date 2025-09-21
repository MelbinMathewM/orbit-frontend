import api from "@/app/axios/axiosInstance";
import { packageItems } from "@/constants/modal-items";
import { WellnessPackageFormType } from "@/types/form";
import { WellnessModalType } from "@/types/modal";
import { Image } from "expo-image";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, useColorScheme, View } from "react-native";
import CustomButton from "../../ui/custom-button";
import CustomTextInput from "../../ui/custom-text-input";
import SelectField from "../../ui/select-field";
import SelectModal from "../../ui/select-modal";
import { showError, showSuccess } from "../../ui/snackBar";
import BookingHeader from "@/components/ui/booking-header";

const fieldMap: Record<WellnessModalType, keyof WellnessPackageFormType> = {
    packages: "packageType"
};

export default function WellnessPackage() {
    const [form, setForm] = useState<WellnessPackageFormType>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        packageType: "",
        numberOfDays: "",
        adultNumber: "",
        additionalRequirements: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<{
        type: WellnessModalType | null;
    }>({ type: null });

    const handleChange = (key: keyof WellnessPackageFormType, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateInputs = () => {
        const requiredFields: (keyof WellnessPackageFormType)[] = [
            "fullName",
            "emailAddress",
            "phoneNumber",
            "packageType",
            "numberOfDays",
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
            const response = await api.post("/booking/wellness-package", { form });
            if (response.status === 201) {
                showSuccess("Enquiry submitted successfully");
                setForm({
                    fullName: "",
                    emailAddress: "",
                    phoneNumber: "",
                    packageType: "",
                    numberOfDays: "",
                    adultNumber: "",
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
            case "packages":
                return packageItems;
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
                <BookingHeader title="Wellness Package Form" />
                <View className="px-5 space-y-5">
                    <CustomTextInput label="Full Name" value={form.fullName} onChangeText={(t) => handleChange("fullName", t)} />
                    <CustomTextInput label="Email Address" value={form.emailAddress} onChangeText={(t) => handleChange("emailAddress", t)} keyboardType="email-address" />
                    <CustomTextInput label="Phone Number" value={form.phoneNumber} onChangeText={(t) => handleChange("phoneNumber", t)} keyboardType="phone-pad" />

                    <SelectField<WellnessModalType> label="Package Type" value={form.packageType} type="packages" onPress={(type) => setShowModal({ type })} />
                    <CustomTextInput label="Number of Days" value={form.numberOfDays} onChangeText={(t) => handleChange("numberOfDays", t)} />

                    <View className="flex-1 pe-1">
                        <CustomTextInput label="Adults" value={form.adultNumber} onChangeText={(t) => handleChange("adultNumber", t)} style={{ flex: 1 }} />
                    </View>

                    <CustomTextInput label="Additional Requirements" value={form.additionalRequirements} onChangeText={(t) => handleChange("additionalRequirements", t)}
                        multiline numberOfLines={4} style={{ marginBottom: 12, height: 120 }}
                    />

                    <CustomButton label="Submit" onPress={handleSubmit}
                        loading={loading}
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
