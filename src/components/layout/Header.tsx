import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextCustom from '../ui/TextCustom';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <View style={styles.header}>
            <TextCustom variant="h1">{title}</TextCustom>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3498db',
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Header;
