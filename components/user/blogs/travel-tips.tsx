import React from "react";
import { ScrollView, View, Text } from "react-native";

export default function TravelSafetyTips() {
    return (
        <ScrollView className="px-4 py-6 bg-white">
            {/* Title */}
            <Text className="text-2xl text-orange-600 font-bold mb-2 text-center">
                Travel Safety Tips: Ensuring a Secure and Enjoyable Journey
            </Text>

            {/* Intro */}
            <Text className="text-gray-700 text-base mb-4 leading-relaxed">
                Traveling opens up a world of exciting opportunities and unforgettable
                experiences, but it's essential to prioritize safety to fully enjoy your
                adventures. At ORBIT Travels, we are committed to ensuring that your
                journey is not only memorable but also secure. Here are some key travel
                safety tips to help you navigate your trips with confidence.
            </Text>

            {/* Tips list */}
            <View className="space-y-4">
                <View>
                    <Text className="font-semibold text-lg mb-1">
                        1. Plan Ahead and Stay Informed
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Before embarking on your journey, take the time to research your
                        destination thoroughly. Stay informed about local customs, safety
                        advisories, and any travel restrictions. Check government travel
                        advisories and local news to be aware of any potential risks or
                        safety concerns in the area you're visiting.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        2. Secure Your Travel Documents
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Keep your travel documents, such as passports, visas, and insurance
                        information, safe and accessible. Carry photocopies and store them
                        separately. Consider using a travel wallet or pouch for added
                        security.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">3. Protect Your Health</Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Consult with your healthcare provider about vaccinations and health
                        precautions before traveling. Pack a first-aid kit with medications,
                        and be mindful of food and water safety.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        4. Use Reliable Transportation
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Choose reputable transportation services. Whether taxis, rentals, or
                        public transport, ensure they are trustworthy. Consider ride-sharing
                        apps or pre-arranged transfers for safety.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        5. Stay Aware and Vigilant
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Watch your belongings, avoid showing valuables, and stay alert in
                        crowded places. Be cautious of scams or pickpockets, and trust your
                        instincts.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        6. Emergency Contacts and Local Help
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Know local emergency numbers, embassy/consulate locations, and
                        nearby medical facilities. Familiarize yourself with local emergency
                        services.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        7. Share Your Travel Plans
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Keep family or friends updated on your itinerary. Sharing plans adds
                        an extra layer of security in case of emergencies.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">8. Stay Connected</Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        Stay in touch with loved ones via roaming or local SIM cards. Keep a
                        charged phone and portable charger handy.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">9. Respect Local Customs</Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Learn about and respect local traditions. Adhering to cultural norms
                        prevents misunderstandings and enriches your travel experience.
                    </Text>
                </View>

                <View>
                    <Text className="font-semibold text-lg mb-1">
                        10. Follow Health and Safety Guidelines
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                        Follow health rules, such as COVID-19 guidelines, mask-wearing,
                        hygiene, and distancing. Stay updated on local regulations.
                    </Text>
                </View>
            </View>

            {/* Outro */}
            <Text className="text-lg font-semibold mt-6 mb-2">Travel with Confidence</Text>
            <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-8">
                At ORBIT Travels, we are dedicated to ensuring your journey is both
                enjoyable and secure. By following these tips, you can focus on creating
                wonderful memories while minimizing risks. Ready to plan your next
                adventure? Contact us today and travel with confidence. Safe travels!
            </Text>
        </ScrollView>
    );
}
