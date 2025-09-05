import { useState } from "react";
import { View, Text, TouchableOpacity, useColorScheme, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import SelectModal from "../ui/select-modal";
import { TextInput } from "react-native-paper";
import { vehicleItems, activityItems, methodItems, dayTourLocationItems } from "../../constants/modal-items";
import { DatePickerInput } from "react-native-paper-dates";
import { showError, showSuccess } from "../ui/snackBar";
import api from "@/app/axios/axiosInstance";
import CustomTextInput from "../ui/custom-text-input";

interface DayTourEnquiryForm {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    pickUp: string;
    dropOff: string;
    date: Date | string;
    time: string;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    vehicleType: string;
    location: string;
    activities: string;
    budget: string | number;
    additionalRequirements: string;
}

type ModalType = "method" | "vehicle" | "location" | "activities";

const fieldMap: Record<ModalType, keyof DayTourEnquiryForm> = {
    method: "methodContact",
    vehicle: "vehicleType",
    location: "location",
    activities: "activities",
};

export default function DayTourEnquiryForm() {

    const [form, setForm] = useState<DayTourEnquiryForm>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        methodContact: "",
        pickUp: "",
        dropOff: "",
        date: "",
        time: "",
        adultNumber: "",
        childNumber: "",
        infantNumber: "",
        vehicleType: "",
        location: "",
        activities: "",
        budget: "",
        additionalRequirements: "",
    });

    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();

    const [showModal, setShowModal] = useState<{ type: ModalType | null }>({ type: null });

    const handleChange = (key: keyof DayTourEnquiryForm, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateInputs = () => {
        const requiredFields: (keyof DayTourEnquiryForm)[] = [
            "fullName",
            "emailAddress",
            "phoneNumber",
            "methodContact",
            "pickUp",
            "dropOff",
            "date",
            "time",
            "adultNumber",
            "vehicleType",
            "location",
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
            const response = await api.post("/booking/day-tour-enquiry", { payload });
            if (response.status === 201) {
                showSuccess("Day Tour enquiry submitted successfully");
                setForm({
                    fullName: "",
                    emailAddress: "",
                    phoneNumber: "",
                    methodContact: "",
                    pickUp: "",
                    dropOff: "",
                    date: "",
                    time: "",
                    adultNumber: "",
                    childNumber: "",
                    infantNumber: "",
                    vehicleType: "",
                    location: "",
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
            case "location":
                return dayTourLocationItems;
            case "vehicle":
                return vehicleItems;
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
                        Day Tour Enquiry
                    </Text>
                </View>
                <View className="px-5 space-y-3">
                    <CustomTextInput label="Full Name" value={form.fullName} onChangeText={(t) => handleChange("fullName", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Email Address" value={form.emailAddress} onChangeText={(t) => handleChange("emailAddress", t)} colorScheme={colorScheme || "light"} keyboardType="email-address" />
                    <CustomTextInput label="Phone Number" value={form.phoneNumber} onChangeText={(t) => handleChange("phoneNumber", t)} colorScheme={colorScheme || "light"} keyboardType="phone-pad" />

                    {renderSelect("Contact Method", form.methodContact, "method")}
                    <CustomTextInput label="Pick Up Location" value={form.pickUp} onChangeText={(t) => handleChange("pickUp", t)} colorScheme={colorScheme || "light"} />
                    <CustomTextInput label="Drop Off Location" value={form.dropOff} onChangeText={(t) => handleChange("dropOff", t)} colorScheme={colorScheme || "light"} />


                    <DatePickerInput
                        locale="en"
                        label="Select Date"
                        value={form.date as Date}
                        onChange={(d) => handleChange("date", d)}
                        inputMode="start"
                        style={{
                            marginBottom: 12,
                            backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#FFFFFF",
                            borderWidth: 1,
                            borderColor: colorScheme === "dark" ? "#585A5C" : "#D1D5DB",
                            borderRadius: 8,
                        }}
                        outlineColor={colorScheme === "dark" ? "#585A5C" : "#D1D5DB"}
                        activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
                        textColor={colorScheme === "dark" ? "white" : "black"}
                        theme={{ roundness: 8 }}
                    />

                    <CustomTextInput label="Time" value={form.time} onChangeText={(t) => handleChange("time", t)} colorScheme={colorScheme || "light"} />

                    {/* Passenger Counts */}
                    <Text className="font-medium mt-3 mb-2 text-gray-700 dark:text-gray-300">
                        Select Number of Passengers
                    </Text>
                    <View className="flex-row space-x-4">
                        <CustomTextInput label="Adults" value={form.adultNumber} onChangeText={(t) => handleChange("adultNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                        <CustomTextInput label="Children (2 - 12)" value={form.childNumber} onChangeText={(t) => handleChange("childNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                        <CustomTextInput label="Infants (< 2)" value={form.infantNumber} onChangeText={(t) => handleChange("infantNumber", t)} colorScheme={colorScheme || "light"} style={{ flex: 1 }} />
                    </View>

                    {renderSelect("Vehicle", form.vehicleType, "vehicle")}
                    {renderSelect("Location", form.location, "location")}
                    {renderSelect("Activities", form.activities, "activities")}

                    <CustomTextInput label="Budget" value={form.budget as string} onChangeText={(t) => handleChange("budget", t)} colorScheme={colorScheme || "light"} />

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

                    {/* Submit */}
                    <TouchableOpacity
                        className="bg-blue-600 py-3 rounded-lg items-center"
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text className="text-white font-medium">
                            {loading ? "Submitting..." : "Submit"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Select Modal */}
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
