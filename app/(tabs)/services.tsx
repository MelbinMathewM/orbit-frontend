import ServiceCTA from "@/components/user/service/service-cta";
import ServiceHeader from "@/components/user/service/service-header";
import ServicesHero from "@/components/user/service/service-hero";
import ServiceImage from "@/components/user/service/service-image";
import { ScrollView, Text, View } from "react-native";

export default function Services () {
    return (
        <ScrollView>
            <ServiceHeader />
            <ServicesHero />
            <ServiceCTA />
            <ServiceImage />
        </ScrollView>
    )
}