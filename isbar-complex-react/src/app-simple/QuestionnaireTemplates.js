// file to store questionnaire json file 

export const isbarQuestionnaire = {
    "resourceType": "Questionnaire",
    "title": "questionnaireTitle",
    "name": "isbar-simple",
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


  // create new empty questionnaire response resource with this patient.
  // returns the questionnaire object made.
  export function newQuestionnaireResponse(questionnaireID, patientID) {
    // questionnaire response resource
    var qResponse = {
      resourceType: "QuestionnaireResponse",
      text: { name: "isbar-simple-response" },
      // maybe later when we sort out the thingy
      // Reference the questionnaire
      questionnaire: "Questionnaire/" + questionnaireID,
      status: "in-progress",
      source: {
        // refer to current patient
        reference: "Patient/" + patientID,
      },
      item: [
        {
          linkId: "1",
          text: "I:Identify",
          answer: [
            {
              valueString: "",
            },
          ],
        },
        {
          linkId: "2",
          text: "S:Situation",
          answer: [
            {
              valueString: "",
            },
          ],
        },
        {
          linkId: "3",
          text: "O:Observation",
          answer: [
            {
              valueString: "",
            },
          ],
        },
        {
          linkId: "4",
          text: "B:Background",
          answer: [
            {
              valueString: "",
            },
          ],
        },
        {
          linkId: "5",
          text: "A:Assessment",
          answer: [
            {
              valueString: "",
            },
          ],
        },
        {
          linkId: "6",
          text: "R:Recommendation",
          answer: [
            {
              valueString: "",
            },
          ],
        },
      ],
    };

    return qResponse;
  }