import ContactDetails from "@/components/user/contact/contact-details";
import ContactForm from "@/components/user/contact/contact-form";
import ContactHeader from "@/components/user/contact/contact-header";
import { ScrollView, Text, View } from "react-native";

export default function Contact () {
    return (
        <ScrollView>
            <ContactHeader />
            <ContactDetails />
            <ContactForm />
        </ScrollView>
    )
}