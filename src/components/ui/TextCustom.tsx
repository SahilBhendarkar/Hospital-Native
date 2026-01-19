import React from 'react';
import {
    Text,
    StyleSheet,
    TextProps,
    TextStyle,
    StyleProp,
} from 'react-native';

interface TextCustomProps extends TextProps {
    variant?: 'h1' | 'h2' | 'body' | 'caption';
    children: React.ReactNode;
    style?: StyleProp<TextStyle>; 
}

const TextCustom = ({
    children,
    variant = 'body',
    style,
    ...props
}: TextCustomProps) => {
    return (
        <Text style={[styles[variant], style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    h2: {
        fontSize: 20,
        fontWeight: '600',
        color: '#34495e',
    },
    body: {
        fontSize: 16,
        color: '#2c3e50',
        lineHeight: 24,
    },
    caption: {
        fontSize: 14,
        color: '#7f8c8d',
    },
});

export default TextCustom;
