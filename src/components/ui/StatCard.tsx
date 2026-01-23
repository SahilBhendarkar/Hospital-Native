import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StatCardProps {
    label: string;
    value: string;
    unit?: string;
    icon: keyof typeof Feather.glyphMap;
    trend?: 'up' | 'down' | 'stable';
    trendValue?: string;
    status?: 'normal' | 'warning' | 'critical';
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    unit,
    icon,
    trend,
    trendValue,
    status = 'normal',
    color = '#667eea',
}) => {
    const getStatusColor = () => {
        switch (status) {
            case 'warning':
                return '#f59e0b';
            case 'critical':
                return '#ef4444';
            default:
                return color;
        }
    };

    const iconColor = getStatusColor();

    return (
        <View style={styles.container}>
            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
                <Feather name={icon} size={20} color={iconColor} />
            </View>

            {/* Value */}
            <Text style={styles.value}>
                {value}
                {unit && <Text style={styles.unit}> {unit}</Text>}
            </Text>

            {/* Label */}
            <Text style={styles.label}>{label}</Text>

            {/* Trend */}
            {trend && (
                <View style={styles.trendContainer}>
                    <Feather
                        name={
                            trend === 'up'
                                ? 'trending-up'
                                : trend === 'down'
                                    ? 'trending-down'
                                    : 'minus'
                        }
                        size={14}
                        color={
                            trend === 'up'
                                ? '#10b981'
                                : trend === 'down'
                                    ? '#ef4444'
                                    : '#9ca3af'
                        }
                    />
                    {trendValue && (
                        <Text
                            style={[
                                styles.trendValue,
                                {
                                    color:
                                        trend === 'up'
                                            ? '#10b981'
                                            : trend === 'down'
                                                ? '#ef4444'
                                                : '#9ca3af',
                                },
                            ]}
                        >
                            {trendValue}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexBasis: '48%',
        minHeight: 150,                 // ✅ ensures all content fits
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f3f4f6',

        justifyContent: 'space-between', // ✅ vertical balance
    },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    value: {
        fontSize: 22,                   // ✅ slightly bigger
        fontWeight: '700',
        color: '#111827',
    },

    unit: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6b7280',
    },

    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6b7280',
        marginTop: 2,
    },

    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },

    trendValue: {
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 4,
    },
});

export default StatCard;
