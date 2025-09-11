import { useThemeContext } from "@/app/context/ThemeContext";
import { Stack } from "expo-router";

export default function BookingLayout() {
    const { theme } = useThemeContext();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: theme === "dark" ? "#111829" : "#fff",
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Booking" }} />
            <Stack.Screen name="flight-enquiry" options={{ title: "Flights" }} />
            <Stack.Screen name="hotel-booking" options={{ title: "Hotels" }} />
            <Stack.Screen name="outstation-booking" options={{ title: "Outstation" }} />
            <Stack.Screen name="day-tour-enquiry" options={{ title: "Day Tour" }} />
        </Stack>
    );
}
