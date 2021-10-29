
// get the simplified verison (first prefix, given and family name)
// of the humanName fhir resource
export function getSimpleName(name){
    if(!name.prefix[0]){
        return name.given[0] + " " + name.family
    }
    return name.prefix[0] + " " + name.given[0] + " " + name.family
}