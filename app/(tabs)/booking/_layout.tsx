import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function BookingLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colorScheme !== "dark" ? "#000" : "#fff",
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Booking" }} />
            <Stack.Screen name="flights" options={{ title: "Flights" }} />
            <Stack.Screen name="hotels" options={{ title: "Hotels" }} />
            <Stack.Screen name="cars" options={{ title: "Cars" }} />
        </Stack>
    );
}
