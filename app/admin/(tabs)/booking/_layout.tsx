import { useThemeContext } from "@/app/context/ThemeContext";
import { Stack } from "expo-router";

export default function BookingLayout() {
    const { theme } = useThemeContext();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: theme === "dark" ? "#111827" : "#fff",
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Booking" }} />
            <Stack.Screen name="flight-enquiries" options={{ title: "Flight Enquiries" }} />
            <Stack.Screen name="hotel-bookings" options={{ title: "Hotel Bookings" }} />
        </Stack>
    );
}
