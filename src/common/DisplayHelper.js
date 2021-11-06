
// get the simplified verison (first prefix, given and family name)
// of the humanName fhir resource
// Takes in the whole name object
export function getSimpleName(name){

    var nameString = ""
    var humanName
    name.forEach((element, index) => {

        if(index === 0){
            humanName = element
        }
        // this is a human name instance
        if(element.hasOwnProperty('use')){
            if(element.use === 'official'){
                humanName = element
            }
        }
    });
    if(humanName.hasOwnProperty('text')){
        return humanName.text
    }

    if(humanName.hasOwnProperty('prefix')){
        humanName.prefix.forEach(element => {
            nameString = nameString + element + " "
        })
    }
    if(humanName.hasOwnProperty('given')){
        humanName.given.forEach(element => {
            nameString = nameString + element + " "
        })
    }
    if(humanName.hasOwnProperty('family')){
        nameString = nameString + humanName.family + " "
    }
    return nameString
}

// takes in the time string that can be interpreted by date of js 
// returns time in format of YYYY-MM-DD HH:MM
export function getDateTimeString(time){
    const date = new Date(time)
    return date.getFullYear() + "-"
        + date.getMonth() + "-"
        + date.getDate() + " "
        + date.getHours() + ":"
        + date.getMinutes()
}