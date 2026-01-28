import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const UploadTestScreen = () => {
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    /* ---------- Camera Permission ---------- */
    useEffect(() => {
        if (!permission) return;
        if (!permission.granted) {
            requestPermission();
        }
    }, [permission]);

    /* ---------- Capture Photo ---------- */
    const takePhoto = async () => {
        if (!cameraRef.current) return;

        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.7,
            skipProcessing: true,
        });

        setPhotoUri(photo.uri);
    };

    /* ---------- Pick From Gallery ---------- */
    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "Gallery access is required");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    /* ---------- Mock Upload ---------- */
    const handleUpload = async () => {
        if (!photoUri) return;

        setUploading(true);

        // Mock upload (replace with API later)
        setTimeout(() => {
            console.log("Uploading image:", photoUri);
            setUploading(false);
            Alert.alert("Success", "Image uploaded successfully");
            setPhotoUri(null);
        }, 1500);
    };

    /* ---------- Permission UI ---------- */
    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.center}>
                    <Text style={styles.infoText}>Camera permission is required</Text>
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={requestPermission}
                    >
                        <Text style={styles.btnText}>Allow Camera</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <Text style={styles.title}>Upload Image</Text>
                <Text style={styles.subtitle}>
                    Capture an image using camera or select from gallery.
                </Text>

                {/* Camera / Preview */}
                <View style={styles.cameraWrapper}>
                    {!photoUri ? (
                        <>
                            <CameraView ref={cameraRef} style={styles.camera} />
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={takePhoto}
                            >
                                <Text style={styles.captureText}>CAPTURE</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Image source={{ uri: photoUri }} style={styles.preview} />
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    {!photoUri && (
                        <TouchableOpacity
                            style={styles.secondaryBtn}
                            onPress={pickFromGallery}
                        >
                            <Text style={styles.btnText}>Gallery</Text>
                        </TouchableOpacity>
                    )}

                    {photoUri && (
                        <>
                            <TouchableOpacity
                                style={styles.secondaryBtn}
                                onPress={() => setPhotoUri(null)}
                            >
                                <Text style={styles.btnText}>Retake</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.primaryBtn,
                                    uploading && { opacity: 0.7 },
                                ]}
                                onPress={handleUpload}
                                disabled={uploading}
                            >
                                <Text style={styles.btnText}>
                                    {uploading ? "Uploading..." : "Upload"}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UploadTestScreen;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: "#6b7280",
        marginBottom: 20,
    },
    cameraWrapper: {
        width: "100%",
        aspectRatio: 3 / 4,
        backgroundColor: "#000",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
    },
    camera: {
        flex: 1,
    },
    captureButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "#10b981",
        paddingHorizontal: 36,
        paddingVertical: 14,
        borderRadius: 30,
    },
    captureText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    preview: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        backgroundColor: "#000",
    },
    actions: {
        flexDirection: "row",
        gap: 12,
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: "#10b981",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    secondaryBtn: {
        flex: 1,
        backgroundColor: "#064bd4",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    infoText: {
        fontSize: 16,
        color: "#111827",
        marginBottom: 16,
    },
});
