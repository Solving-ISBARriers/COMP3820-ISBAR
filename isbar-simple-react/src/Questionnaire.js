
// file to store questionnaire related data.
export const questionnaireObject = {
    "resourceType": "Questionnaire",
    "title": "questionnaireTitle",
    "name": "isbar-simple",
    "status": "draft",
    // Introduction
    "item": [{
        "linkid": "ISBARSimpleIdentify",
        "text": "I:Identify",
        "type": "text" // free text
    },
    // Situation
    {
        "linkid": "1",
        "text": "S:Situation",
        "type": "text" // free text
    },
    // Observation. Enable option is not included, because it could be handled by js.
    {
        "linkid": "2",
        "text": "O:Observation",
        "type": "text" // free text
    },
    // Background
    {
        "linkid": "3",
        "text": "B:Background",
        "type": "text" // free text
    },
    // assessment
    {
        "linkid": "4",
        "text": "A:Assessment",
        "type": "text" // free text
    },
    // Recommendation
    {
        "linkid": "5",
        "text": "R:Recommendation",
        "type": "text" // free text
    }]
}