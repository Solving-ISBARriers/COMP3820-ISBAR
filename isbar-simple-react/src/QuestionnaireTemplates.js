
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

export const questionnaireResponseTemplate = {
    "resourceType": "QuestionnaireResponse",
    "status": "in-progress",
    "authored": "2021-09-16T00:00:00+01:00",
    "source": {
        // Needs to be changed to have patient id.
        "reference": "Patient/"
    },
    "item": [
        {
            "linkId": "1"
        }
    ]

}

// {
//     "resourceType": "QuestionnaireResponse",
//     "id": "f201",
//     "text": {
//       "status": "generated",
//       "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f201</p><p><b>status</b>: completed</p><p><b>subject</b>: <a>Roel</a></p><p><b>authored</b>: 18/06/2013 12:00:00 AM</p><p><b>author</b>: <a>Practitioner/f201</a></p><p><b>source</b>: <a>Practitioner/f201</a></p><blockquote><p><b>item</b></p><p><b>linkId</b>: 1</p><h3>Items</h3><table><tr><td>-</td></tr><tr><td>*</td></tr></table></blockquote><blockquote><p><b>item</b></p><p><b>linkId</b>: 2</p><p><b>text</b>: General questions</p><h3>Items</h3><table><tr><td>-</td></tr><tr><td>*</td></tr><tr><td>*</td></tr><tr><td>*</td></tr><tr><td>*</td></tr></table></blockquote><blockquote><p><b>item</b></p><p><b>linkId</b>: 3</p><p><b>text</b>: Intoxications</p><h3>Items</h3><table><tr><td>-</td></tr><tr><td>*</td></tr><tr><td>*</td></tr></table></blockquote></div>"
//     },
//     "status": "completed",
//     "subject": {
//       "reference": "Patient/f201",
//       "display": "Roel"
//     },
//     "authored": "2013-06-18T00:00:00+01:00",
//     "author": {
//       "reference": "Practitioner/f201"
//     },
//     "source": {
//       "reference": "Practitioner/f201"
//     },
//     "item": [
//       {
//         "linkId": "1",
//         "item": [
//           {
//             "linkId": "1.1",
//             "text": "Do you have allergies?",
//             "answer": [
//               {
//                 "valueString": "I am allergic to house dust"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "linkId": "2",
//         "text": "General questions",
//         "item": [
//           {
//             "linkId": "2.1",
//             "text": "What is your gender?",
//             "answer": [
//               {
//                 "valueString": "Male"
//               }
//             ]
//           },
//           {
//             "linkId": "2.2",
//             "text": "What is your date of birth?",
//             "answer": [
//               {
//                 "valueDate": "1960-03-13"
//               }
//             ]
//           },
//           {
//             "linkId": "2.3",
//             "text": "What is your country of birth?",
//             "answer": [
//               {
//                 "valueString": "The Netherlands"
//               }
//             ]
//           },
//           {
//             "linkId": "2.4",
//             "text": "What is your marital status?",
//             "answer": [
//               {
//                 "valueString": "married"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "linkId": "3",
//         "text": "Intoxications",
//         "item": [
//           {
//             "linkId": "3.1",
//             "text": "Do you smoke?",
//             "answer": [
//               {
//                 "valueString": "No"
//               }
//             ]
//           },
//           {
//             "linkId": "3.2",
//             "text": "Do you drink alchohol?",
//             "answer": [
//               {
//                 "valueString": "No, but I used to drink"
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }