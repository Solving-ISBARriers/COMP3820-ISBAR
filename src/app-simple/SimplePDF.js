import React, { useContext } from "react";
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { IsbarClientContext } from "../IsbarFhirClient";
import { getSimpleName } from "../common/DisplayHelper";

// This is the pdf file that will be generated

const styles = StyleSheet.create({
    page: {
        // fontFamily: 'OpenSans',
        backgroundColor: '#FFFFFF',
        padding: '50pt',
    },
    section: {
        marginTop: '15pt',
        marginBottom: '15pt'

    },
    title: {
        fontSize: '25pt',
        textAlign: 'center',
        marginBottom: '25px'
    },
    heading: {
        fontSize: '16pt',
        marginBottom: '10pt',
        marginTop: '15pt'
    },
    content: {
        fontSize: '12pt'
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    },
    patientSection: {
        flexGrow: 1,
        marginTop: '15pt',
        marginBottom: '15pt'
    },
    practitionerSection: {
        flexGrow: 1,
        marginTop: '15pt',
        marginBottom: '15pt',
        // textAlign: 'right'
    }
});

export const SimplePDF = (props) => {
    const { client } = useContext(IsbarClientContext)
    var content = ["N/A", "N/A", "N/A", "N/A", "N/A"]
    // console.log(props.author)
    // console.log(props.recipient)
    // console.log(props.subject)
    // need to resolve the practitioner and stuff, or more like given to it.
    
    props.content.item.forEach((element, index) => {
        if (typeof element.answer !== 'undefined') {

            content[index] = element.answer[0].valueString
        }
    });
    if(props.author && props.recipient && props.subject){
        
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.title}> Simple ISBAR/ISOBAR handover form</Text>
                    <View style={styles.header}>
                        <View style={styles.patientSection}>
                            <Text style={styles.heading}>Patient information</Text>
                            <Text style={styles.content}>{"Name: " + getSimpleName(props.subject.name)}</Text>
                            <Text style={styles.content}>{"DOB: " + props.subject.birthDate}</Text>
                        </View>
                        <View style={styles.practitionerSection}>
                            <Text style={styles.heading}>Author</Text>
                            <Text style={styles.content}>{getSimpleName(props.author.name)}</Text>
                            <Text style={styles.heading}>Recipient</Text>
                            <Text style={styles.content}>{getSimpleName(props.recipient.name)}</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Introduction</Text>
                        <Text style={styles.content}>{content[0]}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Situation</Text>
                        <Text style={styles.content}>{content[1]}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Observation</Text>
                        <Text style={styles.content}>{content[2]}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Background</Text>
                        <Text style={styles.content}>{content[3]}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Assessment</Text>
                        <Text style={styles.content}>{content[4]}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Recommendation</Text>
                        <Text style={styles.content}>{content[5]}</Text>
                    </View>
                </Page>
            </Document>
        )
    } else{
        
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}> Simple ISBAR/ISOBAR handover form</Text>
                <View style={styles.header}>
                    <View style={styles.patientSection}>
                        <Text style={styles.heading}>Patient information</Text>
                        <Text style={styles.content}>{"Name: "}</Text>
                        <Text style={styles.content}>{"DOB: "}</Text>
                    </View>
                    <View style={styles.practitionerSection}>
                        <Text style={styles.heading}>Author</Text>
                        
                        <Text style={styles.heading}>Recipient</Text>
                        
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Introduction</Text>
                    <Text style={styles.content}>{content[0]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Situation</Text>
                    <Text style={styles.content}>{content[1]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Background</Text>
                    <Text style={styles.content}>{content[2]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Assessment</Text>
                    <Text style={styles.content}>{content[3]}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Recommendation</Text>
                    <Text style={styles.content}>{content[4]}</Text>
                </View>
            </Page>
        </Document>
    )
    }
}
export const IsobarDoc = (props) => {

}

