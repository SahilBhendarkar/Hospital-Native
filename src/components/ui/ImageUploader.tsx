import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface ImageUploaderProps {
    onImageSelected?: (uri: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    /* ---------- Pick from Gallery ---------- */
    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            onImageSelected?.(uri);
        }
    };

    /* ---------- Capture from Camera ---------- */
    const captureFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permission required", "Camera access is needed");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            onImageSelected?.(uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Ionicons name="image-outline" size={48} color="#9ca3af" />
                        <Text style={styles.placeholderText}>No image selected</Text>
                    </View>
                )}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
                    <Ionicons name="images" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.cameraButton]}
                    onPress={captureFromCamera}
                >
                    <Ionicons name="camera" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ImageUploader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        elevation: 3,
    },
    preview: {
        width: "100%",
        aspectRatio: 4 / 3,
        backgroundColor: "#f3f4f6",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    placeholder: {
        alignItems: "center",
    },
    placeholderText: {
        marginTop: 8,
        color: "#9ca3af",
    },
    actions: {
        flexDirection: "row",
        gap: 12,
    },
    button: {
        flex: 1,
        backgroundColor: "#2563eb",
        paddingVertical: 14,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    cameraButton: {
        backgroundColor: "#10b981",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
});
