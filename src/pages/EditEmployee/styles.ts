import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    form: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#DCDCDC",
    },
    subtitle: {
        fontWeight: 'bold'
    },
    viewContact: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 15,
    },
    contactTitle: { fontWeight: "bold", fontSize: 16 },
    contactContent: {
        backgroundColor: "#f2f2f2",
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 15,
        padding: 5,
        justifyContent: "center",
        alignItems: "stretch",
    }
});
