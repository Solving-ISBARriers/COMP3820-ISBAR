
// get the simplified verison (first prefix, given and family name)
// of the humanName fhir resource
export function getSimpleName(name){
    if(!name.prefix[0]){
        return name.given[0] + " " + name.family
    }
    return name.prefix[0] + " " + name.given[0] + " " + name.family
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