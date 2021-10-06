import React from "react";
import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';

// have to include them as a local file. probs.
// Font.register({
//     family: 'OpenSans',
//     src: "https://fonts.googleapis.com/css2?family=Open+Sans",

//     fontStyle: 'normal',
//     fontWeight: 'normal'
// });

// Font.register({
//     family: 'Oswald',
//     src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// })

const styles = StyleSheet.create({
    page: {
        // fontFamily: 'OpenSans',
        backgroundColor: '#FFFFFF',
        margin: 10,
        padding: 20,
    },
    section: {
        margin: 15
    },
    heading: {
        fontSize: '16pt',
    }
});
export const IsbarDoc = (props) => {

    var content = ["N/A", "N/A", "N/A", "N/A", "N/A"]
    // console.log("called")
    // console.log(props.content)
    props.content.item.forEach((element, index) => {
        // console.log(typeof element)
        // console.log(element)
        if (typeof element.answer !== 'undefined') {

            content[index] = element.answer[0].valueString
        }
    });
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.heading}>I: Introduction</Text>
                    <Text>{content[0]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>S: Situation</Text>
                    <Text>{content[1]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>B: Background</Text>
                    <Text>{content[2]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>A: Assessment</Text>
                    <Text>{content[3]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>R: Recommendation</Text>
                    <Text>{content[4]}</Text>
                </View>
            </Page>
        </Document>
    )
}
export const IsobarDoc = (props) => {

}

