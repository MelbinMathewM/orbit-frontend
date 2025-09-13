import React from "react";
import { ScrollView, View, Text } from "react-native";

export default function TravelHealthBlog() {
    return (
        <ScrollView className="px-4 py-6">
            {/* Header */}
            <Text className="text-2xl text-orange-600 font-bold mb-4">
                Travel Health Precautions: Staying Safe and Healthy on Your Journey
            </Text>

            {/* Intro Paragraph */}
            <Text className="text-gray-700 mb-4 text-base">
                Traveling can be an exhilarating experience, but it also requires careful
                consideration of your health. Whether you're exploring a bustling city,
                hiking through remote landscapes, or relaxing on a tropical beach,
                maintaining your well-being is crucial to ensuring an enjoyable trip. At
                ORBIT Travels, we prioritize your health and safety, and here's how you
                can take the necessary precautions to stay healthy while traveling.
            </Text>

            {/* Numbered List */}
            <View className="mb-4">
                {[
                    {
                        title: "Consult Your Healthcare Provider",
                        content:
                            "Before you set off on your journey, schedule a visit with your healthcare provider. Discuss your travel plans, including your destination, activities, and any pre-existing health conditions. Your provider can offer tailored advice, recommend vaccinations, and provide guidance on how to manage your health while abroad.",
                    },
                    {
                        title: "Get Vaccinated",
                        content:
                            "Depending on your destination, certain vaccinations might be recommended or required. Common travel vaccines include those for hepatitis A and B, typhoid, yellow fever, and influenza. Check with health authorities or travel clinics to ensure you're up-to-date on any necessary immunizations before departure.",
                    },
                    {
                        title: "Pack a Travel Health Kit",
                        content:
                            "Prepare a travel health kit with essential items such as prescription medications, over-the-counter remedies for common ailments (e.g., pain relievers, anti-diarrheal medication, and antihistamines), and first-aid supplies. Don't forget to include any personal health items like contact lens solutions or specialized treatments.",
                    },
                    {
                        title: "Follow Food and Water Safety Guidelines",
                        content:
                            "To avoid food and waterborne illnesses, be cautious about what you consume. Stick to bottled or purified water, avoid ice cubes, and eat food that is thoroughly cooked. Be especially mindful in regions with different hygiene standards, and opt for reputable restaurants or food vendors.",
                    },
                    {
                        title: "Practice Good Hygiene",
                        content:
                            "Maintaining good hygiene is crucial for preventing illness. Wash your hands frequently with soap and water, especially before eating or after using the restroom. When soap and water aren't available, use an alcohol-based hand sanitizer. Avoid touching your face, particularly your eyes, nose, and mouth, with unwashed hands.",
                    },
                    {
                        title: "Protect Yourself from Insects",
                        content:
                            "Insect-borne diseases are a concern in many regions. Protect yourself by using insect repellent with DEET, wearing long sleeves and pants, and staying in accommodations with good mosquito nets or screens. Be particularly cautious in areas where diseases like malaria, dengue fever, or Zika virus are prevalent.",
                    },
                    {
                        title: "Stay Hydrated and Rested",
                        content:
                            "Traveling can disrupt your routine and affect your health. Keep hydrated by drinking plenty of water, especially in hot climates or at high altitudes. Ensure you get adequate rest to keep your immune system strong and reduce the risk of fatigue-related illnesses.",
                    },
                    {
                        title: "Be Prepared for Altitude Changes",
                        content:
                            "If you're traveling to high altitudes, acclimatize gradually to avoid altitude sickness. Symptoms can include headaches, dizziness, and nausea. Drink plenty of water, avoid strenuous activities initially, and consider medications if recommended by your healthcare provider.",
                    },
                    {
                        title: "Know Your Health Insurance Coverage",
                        content:
                            "Ensure that you have appropriate travel health insurance that covers medical emergencies abroad. Understand the details of your policy, including coverage for medical treatment, evacuation, and repatriation. Carry a copy of your insurance policy and emergency contact information.",
                    },
                    {
                        title: "Stay Informed About Local Health Alerts",
                        content:
                            "Keep up-to-date with local health advisories and alerts related to your destination. Be aware of any outbreaks or health risks and follow any specific guidelines or recommendations from health authorities.",
                    },
                ].map((item, index) => (
                    <View key={index} className="mb-3">
                        <Text className="font-semibold text-xl mb-1">{index + 1}. {item.title}</Text>
                        <Text className="text-gray-700 text-base">{item.content}</Text>
                    </View>
                ))}
            </View>

            {/* Closing Paragraph */}
            <Text className="text-gray-700 text-base mb-4">
                By taking these health precautions, you can minimize risks and focus on enjoying your travels. At ORBIT Travels, we're dedicated to supporting your well-being, ensuring your journey is both safe and memorable. Ready to start planning your next adventure? Contact us today to begin your travel with confidence and peace of mind. Safe travels and stay healthy!
            </Text>
        </ScrollView>
    );
}
