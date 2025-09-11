import FAQsHeader from "@/components/user/faqs/faqs-header";
import FAQsSection from "@/components/user/faqs/faqs-section";
import { ScrollView } from "react-native";

export default function Faqs () {
    return (
        <ScrollView>
            <FAQsHeader />
            <FAQsSection />
        </ScrollView>
    )
}