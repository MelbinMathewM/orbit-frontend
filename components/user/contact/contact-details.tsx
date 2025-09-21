import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

const phoneNumbers = [
    { display: "+91 8431216532", tel: "+918431216532" },
    { display: "+91 9986821915", tel: "+919986821915" },
    { display: "+91 9447787507", tel: "+919447787507" },
    { display: "+971 502682540 (UAE)", tel: "+971502682540" },
];

export default function ContactDetails() {
    return (
        <View className="pt-12 pb-6 px-6 bg-white dark:bg-gray-950">
            <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                Get in Touch
            </Text>
            <Text className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Don't hesitate to contact us
            </Text>

            <View className="flex-row items-center mb-2">
                <Ionicons name="call" size={24} color="#EA580C" className="mr-2" />
                <Text className="text-xl font-semibold text-orange-600 dark:text-orange-400">Phone</Text>
            </View>
            <View className="ml-10 mb-4">
                {phoneNumbers.map((phone, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => Linking.openURL(`tel:${phone.tel}`)}
                        className="mb-2"
                    >
                        <Text className="text-gray-700 dark:text-gray-300 text-lg">
                            {phone.display}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="flex-row items-center mb-2">
                <MaterialIcons name="email" size={24} color="#EA580C" className="mr-2" />
                <Text className="text-xl font-semibold text-orange-600 dark:text-orange-400">Email</Text>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:info@orbit-travels.com")} className="ml-10 mb-6">
                <Text className="text-gray-700 dark:text-gray-300 text-lg">info@orbit-travels.com</Text>
            </TouchableOpacity>

            <View className="flex-col items-start">
                <View className="flex-row items-center mb-2">
                    <Entypo name="location-pin" size={24} color="#EA580C" className="mr-2 mt-1" />
                    <Text className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-1">Address</Text>
                </View>
                <Text className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed ml-10">
                    Number 47, 1st Floor, Aruna Complex,{"\n"}
                    Church Block, Vishwanatha Nagenahalli,{"\n"}
                    RT Nagar, Bengaluru-560032
                </Text>
            </View>
        </View>
    );
}
