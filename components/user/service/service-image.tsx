import React, { useRef, useEffect, useState } from "react";
import { View, Image, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.85;
const SPACING = 10;

const images = [
    require("../../../assets/images/home-hero1.jpeg"),
    require("../../../assets/images/home-hero2.jpg"),
    require("../../../assets/images/home-hero3.jpg"),
];

export default function ServiceCarousel() {
    const flatListRef = useRef<FlatList>(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (index + 1) % images.length;
            setIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <View className="bg-white dark:bg-gray-950 py-6 ps-2">
            <FlatList
                ref={flatListRef}
                data={images}
                keyExtractor={(_, idx) => idx.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={IMAGE_WIDTH + SPACING}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({ item }) => (
                    <View style={{ marginRight: SPACING }}>
                        <Image
                            source={item}
                            style={{
                                width: IMAGE_WIDTH,
                                height: IMAGE_WIDTH * 0.75,
                                borderRadius: 15,
                            }}
                            resizeMode="cover"
                        />
                    </View>
                )}
                onMomentumScrollEnd={(event) => {
                    const scrollX = event.nativeEvent.contentOffset.x;
                    const newIndex = Math.round(scrollX / (IMAGE_WIDTH + SPACING));
                    setIndex(newIndex);
                }}
            />
        </View>
    );
}
