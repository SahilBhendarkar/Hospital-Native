import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    Alert,
    Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface NavItem {
    name: string;
    screen: string;
    dropdown?: NavItem[];
}

const Navlinks: NavItem[] = [
    { name: "Home", screen: "Home" },
    { name: "Departments", screen: "Departments" },
    { name: "Doctors", screen: "Doctors" },
    { name: "Gallery", screen: "Gallery" },
    { name: "Health Plans", screen: "HealthPlans" },
    { name: "Contact", screen: "Contact" },
];


import { useNavigation } from '@react-navigation/native';

const Header = ({
    onNavigate,
    isAuthenticated,
    onLoginPress,
    onLogoutPress,
    showBackButton = false,
    title,
}: {
    onNavigate?: (url: string) => void;
    isAuthenticated: boolean;
    onLoginPress: () => void;
    onLogoutPress: () => void;
    showBackButton?: boolean;
    title?: string;
}) => {
    const navigation = useNavigation<any>();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handlePhonePress = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    };

    const handleEmailPress = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleSocialPress = (url: string) => {
        Linking.openURL(url);
    };

    const handleNavigation = (screen: string) => {
        if (onNavigate) {
            onNavigate(screen);
        } else {
            // Mapping from Header's link names to Navigator's tab names
            const navMap: Record<string, string> = {
                'Home': 'Home',
                'Departments': 'Departments',
                'Doctors': 'Home', // Or Doctors if we had a tab/screen
                'Gallery': 'Home',
                'Health Plans': 'Departments',
                'Contact': 'About'
            };

            const target = navMap[screen] || screen;
            navigation.navigate(target);
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* TOP BAR */}
            <View style={styles.topBar}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.topBarContent}>
                        <TouchableOpacity
                            onPress={() => handlePhonePress('+919099433366')}
                            style={styles.topBarItem}
                        >
                            <Feather name="phone" size={14} color="white" />
                            <Text style={styles.topBarText}>+91-9099433366</Text>
                        </TouchableOpacity>

                        <Text style={styles.topBarDivider}>|</Text>
                        <TouchableOpacity
                            onPress={() => handlePhonePress('+919099733366')}
                        >
                            <Text style={styles.topBarText}>+91-9099733366</Text>
                        </TouchableOpacity>

                        <Text style={styles.topBarDivider}>|</Text>
                        <TouchableOpacity
                            onPress={() => handlePhonePress('+919099433360')}
                        >
                            <Text style={styles.topBarText}>+91-9099433360</Text>
                        </TouchableOpacity>

                        <Text style={styles.topBarDivider}>|</Text>
                        <TouchableOpacity
                            onPress={() => handleEmailPress('Ruganalay@gmail.com')}
                            style={styles.topBarItem}
                        >
                            <Feather name="mail" size={14} color="white" />
                            <Text style={styles.topBarText}>Ruganalay@gmail.com</Text>
                        </TouchableOpacity>

                        <View style={styles.socialIconsContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    handleSocialPress('https://www.facebook.com/')
                                }
                            >
                                <Feather name="facebook" size={16} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSocialPress('https://twitter.com/')}
                            >
                                <Feather name="twitter" size={16} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    handleSocialPress('https://www.youtube.com/')
                                }
                            >
                                <Feather name="youtube" size={16} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    handleSocialPress(
                                        'https://api.whatsapp.com/send?phone=919099433366'
                                    )
                                }
                            >
                                <Feather name="send" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* MAIN HEADER */}
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    {/* LEFT SECTION (BACK + LOGO) */}
                    <View style={styles.leftSection}>
                        {showBackButton && (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.backButton}
                            >
                                <Feather name="arrow-left" size={24} color="#374151" />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={() => handleNavigation('Home')}
                            style={styles.logoContainer}
                        >
                            <View style={styles.logoPlaceholder}>
                                <Text style={styles.logoText}>H</Text>
                            </View>
                            <View>
                                {title && !mobileMenuOpen ? (
                                    <Text style={styles.hospitalName}>{title}</Text>
                                ) : (
                                    <>
                                        <Text style={styles.hospitalName}>Hospital UI</Text>
                                        <Text style={styles.hospitalTagline}>
                                            Partners in Quality Healthcare
                                        </Text>
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* MENU BUTTON */}
                    <TouchableOpacity
                        onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={styles.menuButton}
                    >
                        <Feather
                            name={mobileMenuOpen ? 'x' : 'menu'}
                            size={24}
                            color="#374151"
                        />
                    </TouchableOpacity>
                </View>

                {/* MOBILE MENU */}
                {mobileMenuOpen && (
                    <View style={styles.mobileMenu}>
                        {Navlinks.map((link) => (
                            <TouchableOpacity
                                key={link.name}
                                onPress={() => handleNavigation(link.name)}
                                style={styles.mobileMenuLink}
                            >
                                <Text style={styles.mobileMenuLinkText}>{link.name}</Text>
                            </TouchableOpacity>
                        ))}

                        {!isAuthenticated ? (
                            <TouchableOpacity
                                onPress={() => {
                                    onLoginPress();
                                    setMobileMenuOpen(false);
                                }}
                                style={styles.loginButton}
                            >
                                <Text style={styles.loginButtonText}>Login</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    onLogoutPress();
                                    setMobileMenuOpen(false);
                                }}
                                style={styles.logoutButton}
                            >
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: '#1e3a8a',
        paddingVertical: 8,
    },
    topBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 12,
    },
    topBarItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    topBarText: {
        color: 'white',
        fontSize: 12,
    },
    topBarDivider: {
        color: 'white',
        fontSize: 12,
        marginHorizontal: 4,
    },
    socialIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginLeft: 12,
    },
    headerContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 80,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    backButton: {
        padding: 4,
    },
    logoPlaceholder: {
        width: 56,
        height: 56,
        borderRadius: 8,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    hospitalName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    hospitalTagline: {
        fontSize: 11,
        color: '#2563eb',
    },
    menuButton: {
        padding: 8,
    },
    mobileMenu: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        padding: 16,
        gap: 12,
    },
    mobileMenuLink: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    mobileMenuLinkText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 8,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#dc2626',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 8,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Header;
