/*
    This is the javascript file for basic ISBAR form, for CPMO3820 project.
    Basic ISBAR form consists of five text fields, each corresponding to different
    sections of the form. The form is stored as Questionnaire FHIR resource, and 
    the entry is stored asn QuestionnaireResponse FHIR resource.

    Author: Jerry Jeong
*/

// initialise FHIR object
const client = FHIR.client("https://r4.smarthealthit.org");
// Questionnaire name is used to identify the questionnaire.
const questionnaireName = "ISBARSimple";
const questionnaireTitle = "Text-based ISBAR handover form";
var questionnaireResponse;
var questionnaireID;

// questionnaire object
// Code is not inlcuded becaues it's not related to anything?
const questionnaireObject = {
    "resourceType": "Questionnaire",
    "identifier": questionnaireName,
    "title": questionnaireTitle,
    "name": questionnaireName,
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

// questionnaire object
var ISBARQuestionnaireSimple;

///////////////////////////////////////////////
//Program flow

//findQuestionnaire();
createQuestionnaire();


///////////////////////////////////////////////

// TODO: Get patient information from launch context
// TODO: Query if there is an existing ISBAR questionnaire

// TODO: Impoart the existing questionnaire response

// Clear all questionnaire with given name. Used for dev purposes
function clearAllQuestionnaire(name) {
    client.request("Questionnaire").then(response => {

        if (response.total > 0) {

            // there are number of questionnaires, iterate through the questionnaire
            response.entry.forEach(element => {
                if (element.resource.name == name) {
                    client.delete("Questionnaire/" + questionnaireID).then(console.log).catch(console.error);
                }
            });
        }
    }).catch(console.error);
}

/*
 * Find a questionnaire based on name.
 * If found, store the value 
 */
function findQuestionnaire(name) {
    client.request("Questionnaire").then(response => {

        // function to execute upon fullfillment of promise
        // log the value returned
        console.log(response);
        if (response.total > 0) {

            // there are number of questionnaires, iterate through the questionnaire
            // iterate through the entries
            response.entry.forEach(element => {
                if (element.resource.name == name) {
                    // check if there are duplicates?
                    questionnaireID = element.resource.id;
                    // TODO: implement what to do when we found the ISBAR form.
                    console.log("Found ISBAR form! " + element.resource.name + questionnaireID);
                }
            });
        } else {
            // No match
            // Create a form and get it. Creating a questionnaire in the server could take some time.
            //createQuestionnaire();
            console.log("No simple ISBAR questionnaire in the server");
        }
    }).catch(console.error);
}

/* function to create new ISBAR Questionnaire
 * After creating Questionnaire, save the id of questionnaire.
 */
function createQuestionnaire() {

    // the questionnaire
    client.create(questionnaireObject).then(response => {
        questionnaireID = response.id;
        console.log(questionnaireID);
    }).catch(console.error);

}

/*
    Get questionnaire response. 
*/
function getQuestionnaireResponse() {

    // Check if questionnaire id is set
    if(questionnaireID == undefined){
        return;
    }
    
    client.request("QuestionnaireResponse/" + questionnaireID).then(response => {

        // process the responses.
        // Filter based on the patient.
        if (response.total == 0) {
            // No questionnaire found
            
        } else {
            response.entry.forEach(element =>{
                
            })
            
        }
        response.filter(function (element, index) {
            // check if the source id is same with this patient.
            // element.source = patient;
        })

    })
}

/*
 * Create questionnaire response. 
*/
function createQuestionnaireResponse() {
    questionnaireResponse = {

    }
}