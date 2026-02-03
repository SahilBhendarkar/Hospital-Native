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
import { wp, hp, moderateScale } from "../utils/responsive";

const UploadTestScreen = () => {
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!permission) return;
        if (!permission.granted) {
            requestPermission();
        }
    }, [permission]);

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.7,
            skipProcessing: true,
        });

        setPhotoUri(photo.uri);
    };

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

    const handleUpload = async () => {
        if (!photoUri) return;

        setUploading(true);

        setTimeout(() => {
            console.log("Uploading image:", photoUri);
            setUploading(false);
            Alert.alert("Success", "Image uploaded successfully");
            setPhotoUri(null);
        }, 1500);
    };

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
                <Text style={styles.title}>Upload Image</Text>
                <Text style={styles.subtitle}>
                    Capture an image using camera or select from gallery.
                </Text>

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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    container: {
        padding: wp(5),
    },
    title: {
        fontSize: moderateScale(26),
        fontWeight: "700",
        color: "#111827",
        marginBottom: hp(0.5),
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: "#6b7280",
        marginBottom: hp(2.5),
    },
    cameraWrapper: {
        width: "100%",
        aspectRatio: 3 / 4,
        backgroundColor: "#000",
        borderRadius: wp(4),
        overflow: "hidden",
        marginBottom: hp(2.5),
    },
    camera: {
        flex: 1,
    },
    captureButton: {
        position: "absolute",
        bottom: hp(2.5),
        alignSelf: "center",
        backgroundColor: "#10b981",
        paddingHorizontal: wp(9),
        paddingVertical: hp(1.8),
        borderRadius: wp(7.5),
    },
    captureText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: moderateScale(16),
    },
    preview: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        backgroundColor: "#000",
    },
    actions: {
        flexDirection: "row",
        gap: wp(3),
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: "#10b981",
        paddingVertical: hp(1.8),
        borderRadius: wp(2.5),
        alignItems: "center",
    },
    secondaryBtn: {
        flex: 1,
        backgroundColor: "#064bd4",
        paddingVertical: hp(1.8),
        borderRadius: wp(2.5),
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: moderateScale(15),
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: wp(6),
    },
    infoText: {
        fontSize: moderateScale(16),
        color: "#111827",
        marginBottom: hp(2),
    },
});

export default UploadTestScreen;
