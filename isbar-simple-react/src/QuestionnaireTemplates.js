
// file to store questionnaire related data.
export const questionnaireObject = {
    "resourceType": "Questionnaire",
    "title": "questionnaireTitle",
    "name": "isbar-simple",
    "url": "https://launch.smarthealthit.org/v/r4/fhir/Questionnaire/1347247",
    //"url": "https://launch.smarthealthit.org/v/r4/fhir/Questionnaire/isbar-simple-questionnaire",
    "status": "draft",
    // Introduction
    "item": [{
        "linkid": "1",
        "text": "I:Identify",
        "type": "text" // free text
    },
    // Situation
    {
        "linkid": "2",
        "text": "S:Situation",
        "type": "text" // free text
    },
    // Observation. Enable option is not included, because it could be handled by js.
    {
        "linkid": "3",
        "text": "O:Observation",
        "type": "text" // free text
    },
    // Background
    {
        "linkid": "4",
        "text": "B:Background",
        "type": "text" // free text
    },
    // assessment
    {
        "linkid": "5",
        "text": "A:Assessment",
        "type": "text" // free text
    },
    // Recommendation
    {
        "linkid": "6",
        "text": "R:Recommendation",
        "type": "text" // free text
    }]
}
