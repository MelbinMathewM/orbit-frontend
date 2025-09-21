import SpecialPackagesHeader from "@/components/ui/special-package-header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";

interface Package {
    id: string;
    title: string;
    duration: string;
    rating: number;
    price: string;
    details: string;
    image: any;
}

const packages: Package[] = [
    {
        id: "1",
        title: "PILGRIM PACKAGE - BANGALORE TO HAMPI",
        duration: "4 NIGHTS & 5 DAYS",
        rating: 4.5,
        price: "₹34,500",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-1.jpeg"),
    },
    {
        id: "2",
        title: "TOUR PACKAGE - CENTRAL KERALA IDUKKI / MUNNAR",
        duration: "6 NIGHTS & 7 DAYS",
        rating: 4.7,
        price: "₹48,300",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-2.jpeg"),
    },
    {
        id: "3",
        title: "PILGRIM PACKAGE - BANGALORE - MYSORE - MADIKERI",
        duration: "6 NIGHTS & 7 DAYS",
        rating: 4.6,
        price: "₹48,300",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-3.jpeg"),
    },
    {
        id: "4",
        title: "TOUR PACKAGE - CENTRAL KERALA ERNAKULAM / THRISSUR / PALAKKAD",
        duration: "5 NIGHTS & 6 DAYS",
        rating: 4.6,
        price: "₹34,500",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-4.jpg"),
    },
    {
        id: "5",
        title: "PILGRIM PACKAGE - BANGALORE - SHIMOGA",
        duration: "4 NIGHTS & 5 DAYS",
        rating: 4.5,
        price: "₹34,500",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-5.jpg"),
    },
    {
        id: "6",
        title: "TOUR PACKAGE - NORTHERN KERALA MALAPPURAM / KOZHIKODE / WAYANAD",
        duration: "5 NIGHTS & 6 DAYS",
        rating: 4.5,
        price: "₹41,400",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-6.jpg"),
    },
    {
        id: "7",
        title: "PILGRIM PACKAGE - BANGALORE - MYSORE - OOTY",
        duration: "6 NIGHTS & 7 DAYS",
        rating: 4.7,
        price: "₹48,300",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-7.jpg"),
    },
    {
        id: "8",
        title: "TOUR PACKAGE - SOUTHERN KERALA TRIVANDRUM / KOLLAM / PATHANAMTHITTA",
        duration: "6 NIGHTS & 7 DAYS",
        rating: 4.5,
        price: "₹48,300",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-8.jpg"),
    },
    {
        id: "9",
        title: "TOUR PACKAGE - NORTHERN KERALA - WAYANAD",
        duration: "4 NIGHTS & 5 DAYS",
        rating: 4.6,
        price: "₹34,500",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-9.jpg"),
    },
    {
        id: "10",
        title: "TOUR PACKAGE - SOUTHERN KERALA PATHANAMTHITTA / ALLAPUZHA / KOTTAYAM",
        duration: "5 NIGHTS & 6 DAYS",
        rating: 4.5,
        price: "₹41,400",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-10.jpg"),
    },
    {
        id: "11",
        title: "VELANKANNI",
        duration: "3 DAYS",
        rating: 4.6,
        price: "₹26,000",
        details: "Including Rent, Batta, Toll/Parking etc…",
        image: require("../../../assets/images/sp-11.jpeg"),
    },
];

const TourPackages = () => {
    const renderItem = ({ item }: { item: Package }) => (
        <View className="bg-white dark:bg-gray-950 rounded-lg shadow-sm mb-4 border border-gray-200 dark:border-gray-800">
            <Image
                source={item.image}
                style={{ width: "100%", height: 217.5, aspectRatio: 16 / 9 }}
                resizeMode="cover"
            />

            {/* Info */}
            <View className="p-4">
                <Text className="text-lg font-bold text-orange-600">{item.title}</Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.duration}</Text>
                <Text className="text-yellow-500 mt-1">⭐ {item.rating}/5</Text>
                <Text className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">
                    Package Starting From {item.price}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">{item.details}</Text>
                <Pressable
                    onPress={() => router.push("/contact")}
                    className="flex-row items-center mt-3"
                >
                    <Text className="text-orange-600 font-semibold text-lg mb-1">
                        Book Now
                    </Text>
                    <Ionicons name="arrow-forward-circle" size={22} color="#f97316" style={{ marginLeft: 4 }} />
                </Pressable>
            </View>
        </View>
    );

    return (
        <View>
            <SpecialPackagesHeader />
            <FlatList
                data={packages}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
};

export default TourPackages;

