import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import api from "@/app/axios/axiosInstance";
import CustomTextInput from "@/components/ui/custom-text-input";
import CustomButton from "@/components/ui/custom-button";
import { showError, showSuccess } from "@/components/ui/snackBar";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const { name, email, subject, message } = form;

        if (!name || !email || !subject || !message) {
            Alert.alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/user/contact", { form });
            showSuccess(response.data.message);

            // reset form
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err: any) {
            showError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="px-6 py-12 bg-gray-50 dark:bg-gray-950">
            <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-8 text-center">
                Get in Touch with Us
            </Text>

            <CustomTextInput
                label="Full Name"
                value={form.name}
                onChangeText={(t) => handleChange("name", t)}
            />
            <CustomTextInput
                label="Email Address"
                value={form.email}
                onChangeText={(t) => handleChange("email", t)}
                keyboardType="email-address"
            />
            <CustomTextInput
                label="Enter Subject"
                value={form.subject}
                onChangeText={(t) => handleChange("subject", t)}
            />
            <CustomTextInput
                label="Enter your message"
                value={form.message}
                onChangeText={(t) => handleChange("message", t)}
                multiline
                numberOfLines={4}
                style={{ marginBottom: 12, height: 120 }}
            />

            <CustomButton label="Submit" onPress={handleSubmit} loading={loading} />
        </View>
    );
}
