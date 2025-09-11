import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function BookingLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colorScheme === "dark" ? "#111827" : "#fff",
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Booking" }} />
            <Stack.Screen name="flight-enquiries" options={{ title: "Flight Enquiries" }} />
            <Stack.Screen name="hotel-bookings" options={{ title: "Hotel Bookings" }} />
        </Stack>
    );
}
