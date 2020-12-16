import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    emails: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    emailText: {
        color: '#FFF'
    },
    emailBadge: {
        margin: 2
    },
    item: {
        justifyContent: "space-between",
    },
    viewSelect: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    error: {
        color: '#FF0000',
    },
    selectedValue: {
        color: "#808080"
    }
});
