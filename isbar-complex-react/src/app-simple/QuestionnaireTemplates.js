// file to store questionnaire json file 

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
      subject: {
        reference: "Patient/" + patientID
      },
      source: {
        // refer to current practitioner
        reference: "Patient/" + patientID,
      },
      item: [
        {
          linkId: "1",
          text: "I:Identify",
        },
        {
          linkId: "2",
          text: "S:Situation",
        },
        {
          linkId: "3",
          text: "O:Observation",
        },
        {
          linkId: "4",
          text: "B:Background",
        },
        {
          linkId: "5",
          text: "A:Assessment",
        },
        {
          linkId: "6",
          text: "R:Recommendation",
        },
      ],
    };

    return qResponse;
  }