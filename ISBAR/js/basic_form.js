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
// questionnaire object
const questionnaireObject = {
    "resourceType": "Questionnaire",
    "title": questionnaireTitle,
    "name": questionnaireName,
    "status": "draft"

}

// questionnaire object
var ISBARQuestionnaireSimple;

///////////////////////////////////////////////
//Program flow

// check if ISBAR questionnaire exists
client.request("Questionnaire").then(response => {
        
    // function to execute upon fullfillment of promise
    // log the value returned
    console.log(response);
    if(response.total > 0){

        // there are number of questionnaires, iterate through the questionnaire
        // iterate through the entries
        response.entry.forEach(element => {
           if(element.resource.name == questionnaireName){

                // TODO: implement what to do when we found the ISBAR form.
               console.log("Found ISBAR form! " + element.resource.name);
           } 
        });
    } else{
        // No match
        console.log("No simple ISBAR questionnaire in the server");
    }
}, rej =>{
    
    // the server rejected returning the request.
    console.log("Request rejected");
}).catch(console.error);


///////////////////////////////////////////////

// TODO: Get patient information from launch context
// TODO: Query if there is an existing ISBAR questionnaire

// TODO: Impoart the existing questionnaire response

/* function to create new ISBAR Questionnaire
 */
function createQuestionnaire(){

    // the questionnaire
    client.create(questionnaireObject).then(console.log).catch(console.error);
}

