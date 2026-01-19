import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    children: React.ReactNode;
}

const Card = ({ children, style, ...props }: CardProps) => {
    return (
        <View style={[styles.card, style]} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        margin: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    }
});

export default Card;
