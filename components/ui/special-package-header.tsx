import { View, Text, Pressable, ImageBackground, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SpecialPackagesHeader = () => {
    const router = useRouter();

    return (
        <ImageBackground
            source={require("@/assets/images/special-package-bg.jpg")}
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View className="relative px-4">
                <Pressable
                    onPress={() => router.push("/booking")}
                    className="flex-row items-center mb-3"
                >
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                    <Text className="ml-2 text-white font-semibold text-base">
                        Back
                    </Text>
                </Pressable>

                {/* Title */}
                <Text className="text-3xl text-center font-bold text-white">
                    Our Special Packages
                </Text>

                {/* Subtitle */}
                <Text className="text-white text-base mt-3 text-center leading-6">
                    We, <Text className="font-semibold text-orange-300">ORBIT Travels</Text>, 
                    are committed to creating exceptional travel experiences customized 
                    to your every need. Our personalized itineraries ensure your journey 
                    aligns with your unique interests and preferences — from destination 
                    highlights to hidden gems.
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bgImage: {
        width: "100%",
        height: 260,
        justifyContent: "center",
        paddingVertical: 28,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
});

export default SpecialPackagesHeader;
