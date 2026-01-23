import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface HealthTipCardProps {
    title: string;
    description: string;
    category: string;
    icon: keyof typeof Feather.glyphMap;
    colors: [string, string, ...string[]];
}

const HealthTipCard: React.FC<HealthTipCardProps> = ({
    title,
    description,
    category,
    icon,
    colors,
}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <TouchableOpacity
                    style={styles.content}
                    onPress={toggleExpand}
                    activeOpacity={0.9}
                >
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Feather name={icon} size={20} color={colors[0]} />
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{category}</Text>
                            </View>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <Feather
                            name={expanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#fff"
                            style={styles.chevron}
                        />
                    </View>

                    {expanded && (
                        <View style={styles.detailsContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.description}>{description}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginHorizontal: 4,
        marginBottom: 8,
    },
    gradient: {
        borderRadius: 16,
        padding: 2, // Border effect
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glass effect
        borderRadius: 14,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    categoryBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    chevron: {
        marginLeft: 8,
        opacity: 0.8,
    },
    detailsContainer: {
        marginTop: 12,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 20,
    },
});

export default HealthTipCard;
