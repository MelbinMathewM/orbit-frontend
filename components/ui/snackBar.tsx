import Toast from "react-native-toast-message";

export const showSuccess = (message: string) => {
    Toast.show({
        type: "success",
        text1: message,
        visibilityTime: 3000,
        autoHide: true,
    });
};

export const showError = (message: string) => {
    Toast.show({
        type: "error",
        text1: message,
        visibilityTime: 3000,
        autoHide: true,
    });
};


export const showInfo = (message: string) => {
    Toast.show({
        type: "info",
        text1: message,
        visibilityTime: 3000,
        autoHide: true,
    });
};
