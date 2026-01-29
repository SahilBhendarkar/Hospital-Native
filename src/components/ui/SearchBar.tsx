import React, { useRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchBarProps {
    placeholder?: string;
    value: string;                     
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search doctors, departments...',
    value,
    onChangeText,
    onFocus,
    onBlur,
}) => {
    const focusAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        Animated.timing(focusAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        onFocus?.();
    };

    const handleBlur = () => {
        Animated.timing(focusAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        onBlur?.();
    };

    const handleClear = () => {
        onChangeText('');
    };

    const borderColor = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#e5e7eb', '#667eea'],
    });

    return (
        <Animated.View style={[styles.container, { borderColor }]}>
            <Feather name="search" size={20} color="#9ca3af" style={styles.searchIcon} />

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
                value={value}
                onChangeText={onChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                returnKeyType="search"
            />

            {value.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <Feather name="x-circle" size={18} color="#9ca3af" />
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 2,
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1f2937',
        padding: 0,
    },
    clearButton: {
        padding: 4,
    },
});

export default SearchBar;
