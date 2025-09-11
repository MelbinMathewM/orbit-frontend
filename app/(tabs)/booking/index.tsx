import BookingHeader from "@/components/user/booking/booking-header";
import BookingMain from "@/components/user/booking/booking-home";
import { ScrollView } from "react-native";

export default function BookingScreen() {

  return (
    <ScrollView>
      <BookingHeader />
      <BookingMain />
    </ScrollView>
  );
}
