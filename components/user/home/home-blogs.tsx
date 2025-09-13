import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";

type Blog = {
    category: string;
    image: any;
    title: string;
    date: string;
    link: string;
    excerpt: string;
};

const blogs: Blog[] = [
    {
        category: "Uncategorized",
        image: require("../../../assets/images/blog-1.jpg"),
        title: "Travel Health Precautions: Staying Safe and Healthy on Your Journey",
        date: "August 12, 2025",
        link: "/blogs/travel-health-precautions",
        excerpt: "Traveling can be an exhilarating experience, but it also requires careful consideration...",
    },
    {
        category: "Uncategorized",
        image: require("../../../assets/images/blog-2.jpg"),
        title: "Travel Safety Tips: Ensuring a Secure and Enjoyable Journey",
        date: "August 12, 2025",
        link: "/blogs/travel-safety-tips",
        excerpt: "Traveling opens up a world of exciting opportunities and unforgettable experiences, but...",
    },
    {
        category: "Uncategorized",
        image: require("../../../assets/images/blog-3.jpg"),
        title: "Embark on Adventures with ORBIT Travels: Discover the World Like Never Before",
        date: "August 2, 2025",
        link: "/blogs/embark-on-adventures",
        excerpt: "Embark on Adventures with ORBIT Travels: Discover the World Like Never Before...",
    },
];

export default function HomeBlogs() {
    return (
        <ScrollView className="px-4 py-6">
            {/* Header */}
            <View className="mb-6 items-center">
                <Text className="text-3xl font-bold text-center">Our Blog & Articles</Text>
                <Text className="text-gray-600 text-lg mt-2 text-center max-w-[90%]">
                    Discover travel tips, destination guides, and expert advice in our blog. Stay informed and inspired for your next adventure with our insightful articles.
                </Text>
            </View>

            {/* Blog list */}
            <View className="flex flex-wrap justify-between">
                {blogs.map((blog, idx) => (
                    <View
                        key={idx}
                        className="bg-white rounded-lg shadow-sm mb-4 w-full md:w-[48%] lg:w-[32%] overflow-hidden"
                    >
                        {/* Image */}
                        <Image
                            source={blog.image}
                            style={{ width: "100%", height: 180 }}
                            resizeMode="cover"
                        />

                        {/* Content */}
                        <View className="p-4 flex flex-col">
                            <Text className="text-sm text-orange-600 font-semibold">{blog.category}</Text>
                            <Text className="mt-2 text-lg font-semibold">{blog.title}</Text>
                            <Text className="text-gray-400 text-sm mt-1">{blog.date}</Text>
                            <Text className="mt-2 text-gray-600">{blog.excerpt}</Text>

                            <TouchableOpacity
                                onPress={() => router.push(blog.link as RelativePathString)}
                                className="mt-3 flex-row items-center"
                            >
                                <Text className="text-orange-500 font-semibold text-lg mr-2 mb-1">Read more</Text>
                                <Ionicons name="arrow-forward" size={20} color="orange" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
