import BlogsHeader from "@/components/user/blogs/blogs-header";
import EmbarkOnAdventures from "@/components/user/blogs/embark-adventure";
import { ScrollView } from "react-native";

export default function EmbarkAdventureBlogScreen() {
    return (
        <ScrollView>
            <BlogsHeader />
            <EmbarkOnAdventures />
        </ScrollView>
    )
}