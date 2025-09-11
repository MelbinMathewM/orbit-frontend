import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputFieldProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
};

export default function ContactForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = () => {
        if (!name || !email || !subject || !message) {
            Alert.alert("Please fill all fields");
            return;
        }
        Alert.alert("Message sent successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    };

    const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText, multiline = false }) => (
        <View className="mb-4">
            <Text className="text-gray-700 dark:text-gray-300 mb-1">{placeholder}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700"
            />
        </View>
    );

    return (
        <View className="px-6 py-12 bg-gray-50 dark:bg-gray-950">
            <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-8 text-center">
                Get in Touch with Us
            </Text>

            <InputField placeholder="Enter Your Name" value={name} onChangeText={setName} />
            <InputField placeholder="Enter Your Email" value={email} onChangeText={setEmail} />
            <InputField placeholder="Enter Subject" value={subject} onChangeText={setSubject} />
            <InputField placeholder="Enter Your Message" value={message} onChangeText={setMessage} multiline />

            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-orange-500 dark:bg-orange-500 px-6 py-4 rounded-lg items-center flex-row justify-center shadow-lg mt-2"
            >
                <Text className="text-white font-semibold text-lg mr-2">Send Message</Text>
                <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
}
