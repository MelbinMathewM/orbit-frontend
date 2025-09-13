import BlogsHeader from "@/components/user/blogs/blogs-header";
import TravelHealthBlog from "@/components/user/blogs/travel-safety";
import { ScrollView } from "react-native";

export default function TravelHealthBlogScreen() {
    return (
        <ScrollView>
            <BlogsHeader />
            <TravelHealthBlog />
        </ScrollView>
    )
}