
  // create new empty questionnaire response resource with this patient.
  // returns the questionnaire object made.
  export function newCarePlan(patientID, authorID) {
    // questionnaire response resource
    var carePlan = {
      resourceType: "CarePlan",
      identifier:  [{
        value: "isbar-complex-careplan",
      }],
      // maybe later when we sort out the thingy
      // Reference the questionnaire
      status: "active",
      intent: "plan",
      subject: {
        reference: "Patient/" + patientID
      },
      author: {
        reference: "Practitioner/" + authorID
      },
    };

    return carePlan;
  }