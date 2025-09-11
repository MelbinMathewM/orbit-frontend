import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function BookingLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colorScheme === "dark" ? "#111829" : "#fff",
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
