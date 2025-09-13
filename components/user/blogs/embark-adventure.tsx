import React from "react";
import { ScrollView, View, Text } from "react-native";

export default function EmbarkOnAdventures() {
    return (
        <ScrollView className="px-4 py-6 bg-white">
            {/* Title */}
            <Text className="text-2xl text-orange-600 font-bold mb-4 text-center">
                Embark on Adventures with ORBIT Travels: Discover the World Like Never Before
            </Text>

            {/* Intro */}
            <Text className="text-gray-700 dark:text-gray-300 text-base mb-4 leading-relaxed">
                Are you ready to break away from the everyday and dive into extraordinary
                experiences? At ORBIT Travels, we believe that every journey should be
                more than just a trip—it should be an adventure that leaves you with
                lasting memories and a fresh perspective. Let us guide you through the
                world's most captivating destinations with our expertly curated
                itineraries.
            </Text>

            {/* Sections */}
            <View className="space-y-5">
                <View>
                    <Text className="font-semibold text-lg mb-1">
                        Tailored Itineraries for Every Explorer
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        Whether you're a thrill-seeker, a culture enthusiast, or someone
                        looking to relax and recharge, our personalized itineraries are
                        designed to cater to your unique interests. Imagine exploring the
                        ancient temples of Kyoto, wandering through the vibrant streets of
                        Paris, or relaxing on the stunning beaches of Cape Town. With ORBIT
                        Travels, your adventure is customized to ensure every detail aligns
                        with your desires.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        Seamless Travel from Start to Finish
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        Travel should be exhilarating, not exhausting. That's why we handle
                        all the details, from booking flights and accommodations to arranging
                        local tours and transportation. Our goal is to make your journey as
                        smooth and enjoyable as possible, so you can focus on soaking in every
                        moment.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        Local Insights and Unique Experiences
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        One of the highlights of traveling with ORBIT Travels is gaining
                        insider access to hidden gems and local favorites. Our local guides
                        provide enriching insights and take you beyond the typical tourist
                        spots, offering a deeper connection to each destination. Whether it's
                        a private tour of a historic site or a culinary adventure through a
                        bustling market, we ensure that every experience is both unique and
                        memorable.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        Unmatched Support and Flexibility
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        We understand that plans can change and unexpected challenges can
                        arise. That's why our 24/7 customer support is always available to
                        assist you, no matter where you are. With ORBIT Travels, you can
                        embark on your adventure with confidence, knowing that support is just
                        a call away.
                    </Text>
                </View>
            </View>

            {/* Outro */}
            <Text className="text-lg font-semibold mt-6 mb-2">Start Your Adventure Today</Text>
            <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-8">
                Are you ready to turn your travel dreams into reality? Explore our range
                of destinations and discover how ORBIT Travels can transform your next
                trip into a remarkable adventure. Visit our website or contact our team
                to start planning your journey. The world is waiting—let's embark on an
                adventure like never before!
            </Text>
        </ScrollView>
    );
}
