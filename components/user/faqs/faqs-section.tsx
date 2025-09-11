import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type FAQ = {
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    {
        question: "What services do you provide?",
        answer: "We offer a range of services including airport transportation, wedding transportation, holiday tour packages, sightseeing and attractions, and pilgrims' packages.",
    },
    {
        question: "Can you offer the best deals on accommodation?",
        answer: "Yes, Orbit Travels is dedicated to finding you the best deals on accommodation. We partner with a wide range of hotels and lodging options to provide competitive rates and exclusive offers tailored to your needs.",
    },
    {
        question: "Is it safe for solo travelers, particularly women? Will my belongings be secure while traveling with you?",
        answer: "Yes, we prioritize the safety and security of all our travelers, including solo women travelers. Our team ensures that all our services are handled with the utmost care and attention to safety. We work with trusted partners and provide secure transport and accommodation options. Additionally, we offer 24/7 customer support to address any concerns during your trip. Your belongings are also kept secure, and we advise taking standard precautions to ensure a smooth and worry-free travel experience.",
    },
    {
        question: "What's the ideal way to explore a [destination] (guided tours, self-guided, etc.)?",
        answer: "The ideal way to explore a destination depends on your preferences and travel style. Guided tours offer in-depth knowledge and convenience, making them perfect for those who want a structured experience with local insights. Self-guided tours provide flexibility and independence, allowing you to explore at your own pace. For a balanced approach, consider combining both options. Our team can help you choose the option that best suits your interests and travel goals.",
    },
    {
        question: "Are you flexible with food choices?",
        answer: "Yes, we accommodate various food preferences and dietary requirements. Whether you have specific dietary needs, allergies, or prefer certain types of cuisine, just let us know in advance. We’ll do our best to ensure your dining options align with your preferences and requirements during your trip.",
    },
    {
        question: "Can you offer assistance in case of an emergency?",
        answer: "Absolutely. We provide 24/7 customer support to assist you in any emergency situation during your travels. Whether you need help with unexpected issues or require urgent support, our team is here to ensure you receive the assistance you need promptly and effectively.",
    },
    {
        question: "Are there any hidden charges?",
        answer: "We strive for transparency in all our services and ensure that any applicable fees are clearly communicated upfront. There are no hidden charges; any additional costs will be outlined in your booking details. If you have any questions about potential fees or charges, please feel free to ask, and we'll provide full clarity.",
    },
];

export default function FAQsSection() {
    const [openIndex, setOpenIndex] = useState<number>(0);

    const toggleDropdown = (index: number) => {
        setOpenIndex(index);
    };

    return (
        <View className="px-6 py-12 bg-gray-50 dark:bg-gray-950">

            {faqs.map((faq, index) => (
                <View
                    key={index}
                    className="mb-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
                >
                    <TouchableOpacity
                        onPress={() => toggleDropdown(index)}
                        className="flex-row items-center px-4 py-4"
                    >
                        <Text className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
                            {faq.question}
                        </Text>
                        <Ionicons
                            name={openIndex === index ? "chevron-up" : "chevron-down"}
                            size={24}
                            color={openIndex === index ? "#2563EB" : "#6B7280"}
                        />
                    </TouchableOpacity>
                    {openIndex === index && (
                        <View className="px-4 py-4 bg-gray-50 dark:bg-gray-950">
                            <Text className="text-gray-700 text-lg dark:text-gray-300">{faq.answer}</Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
}