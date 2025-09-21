import "expo-constants";

declare module "expo-constants" {
    interface Extra {
        API_URL: string;
    }

    interface ExpoConfig {
        extra?: Extra;
    }
}
