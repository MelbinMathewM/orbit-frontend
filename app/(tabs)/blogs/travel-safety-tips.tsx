import BlogsHeader from "@/components/user/blogs/blogs-header";
import TravelSafetyTips from "@/components/user/blogs/travel-tips";
import { ScrollView } from "react-native";

export default function TravelTripsBlogScreen() {
    return (
        <ScrollView>
            <BlogsHeader />
            <TravelSafetyTips />
        </ScrollView>
    )
}